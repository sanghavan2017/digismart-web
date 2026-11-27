// Helper gọi REST API (PostgREST) của Supabase project "digismart-web-shop" — dùng fetch thuần,
// không thêm package @supabase/supabase-js, theo đúng pattern lib/kv.ts đang dùng cho Vercel KV.
// Dùng SERVICE ROLE KEY (bỏ qua RLS) — chỉ gọi từ API route phía server, không bao giờ lộ ra client.

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supabaseRequest<T>(path: string, init: RequestInit): Promise<T> {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error("Supabase chưa được cấu hình (thiếu SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY)");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase REST lỗi (${res.status}): ${errText}`);
  }
  if (res.status === 204) return [] as unknown as T;
  return res.json();
}

export type DbCustomer = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  created_at: string;
};

export type DbOrder = {
  id: string;
  order_code: string;
  customer_id: string;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: string;
  shipping_note: string | null;
  discount_code: string | null;
  discount_amount: number;
  subtotal: number;
  shipping_fee: number;
  total: number;
  note: string | null;
  created_at: string;
};

export async function createCustomer(input: {
  fullName: string;
  phone: string;
  email?: string | null;
  address?: string | null;
}): Promise<DbCustomer> {
  const rows = await supabaseRequest<DbCustomer[]>("customers", {
    method: "POST",
    body: JSON.stringify({
      full_name: input.fullName,
      phone: input.phone,
      email: input.email || null,
      address: input.address || null,
    }),
  });
  return rows[0];
}

export async function createOrder(input: {
  orderCode: string;
  customerId: string;
  paymentMethod: "cod" | "bank_transfer";
  shippingAddress: string;
  shippingNote?: string | null;
  subtotal: number;
  shippingFee: number;
  total: number;
  note?: string | null;
}): Promise<DbOrder> {
  const rows = await supabaseRequest<DbOrder[]>("orders", {
    method: "POST",
    body: JSON.stringify({
      order_code: input.orderCode,
      customer_id: input.customerId,
      payment_method: input.paymentMethod,
      shipping_address: input.shippingAddress,
      shipping_note: input.shippingNote || null,
      subtotal: input.subtotal,
      shipping_fee: input.shippingFee,
      total: input.total,
      note: input.note || null,
    }),
  });
  return rows[0];
}

export type DbOrderWithDetails = DbOrder & {
  customers: { full_name: string; phone: string; email: string | null; address: string | null } | null;
  order_items: { product_name: string; unit_price: number; quantity: number; subtotal: number }[];
};

export async function listOrders(limit = 100): Promise<DbOrderWithDetails[]> {
  return supabaseRequest<DbOrderWithDetails[]>(
    `orders?select=*,customers(full_name,phone,email,address),order_items(product_name,unit_price,quantity,subtotal)&order=created_at.desc&limit=${limit}`,
    { method: "GET" }
  );
}

export async function createOrderItems(
  orderId: string,
  items: { productSlug: string; productName: string; unitPrice: number; quantity: number; subtotal: number }[]
): Promise<void> {
  await supabaseRequest("order_items", {
    method: "POST",
    body: JSON.stringify(
      items.map(i => ({
        order_id: orderId,
        product_slug: i.productSlug,
        product_name: i.productName,
        unit_price: i.unitPrice,
        quantity: i.quantity,
        subtotal: i.subtotal,
      }))
    ),
  });
}
