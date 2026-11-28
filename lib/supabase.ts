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

// ------- product_reviews — xem specs/002-url-cua-hang-dich-vu/data-model.md mục 3 -------
// Bảng này CHƯA được tạo trên Supabase — chờ chủ dự án duyệt SQL trước khi các hàm dưới
// đây chạy được thật (sẽ báo lỗi "relation does not exist" cho tới khi đó, đúng như dự kiến).

export type DbReview = {
  id: string;
  product_slug: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  reviewed_at: string | null;
};

export async function createReview(input: {
  productSlug: string;
  reviewerName: string;
  rating: number;
  comment: string;
}): Promise<DbReview> {
  const rows = await supabaseRequest<DbReview[]>("product_reviews", {
    method: "POST",
    body: JSON.stringify({
      product_slug: input.productSlug,
      reviewer_name: input.reviewerName,
      rating: input.rating,
      comment: input.comment,
      status: "pending",
    }),
  });
  return rows[0];
}

export async function listApprovedReviewsByProduct(productSlug: string): Promise<DbReview[]> {
  return supabaseRequest<DbReview[]>(
    `product_reviews?product_slug=eq.${encodeURIComponent(productSlug)}&status=eq.approved&order=created_at.desc`,
    { method: "GET" }
  );
}

// Rating trung bình cho TỪNG sản phẩm có ít nhất 1 đánh giá đã duyệt — dùng cho thẻ sản
// phẩm ở trang danh mục (1 lượt gọi duy nhất, tránh gọi lặp theo từng sản phẩm).
export async function getApprovedRatingSummaryByProduct(): Promise<Record<string, { avg: number; count: number }>> {
  const rows = await supabaseRequest<{ product_slug: string; rating: number }[]>(
    "product_reviews?select=product_slug,rating&status=eq.approved",
    { method: "GET" }
  );
  const summary: Record<string, { total: number; count: number }> = {};
  for (const r of rows) {
    if (!summary[r.product_slug]) summary[r.product_slug] = { total: 0, count: 0 };
    summary[r.product_slug].total += r.rating;
    summary[r.product_slug].count += 1;
  }
  const result: Record<string, { avg: number; count: number }> = {};
  for (const slug of Object.keys(summary)) {
    result[slug] = { avg: summary[slug].total / summary[slug].count, count: summary[slug].count };
  }
  return result;
}

export async function listPendingReviews(): Promise<DbReview[]> {
  return supabaseRequest<DbReview[]>("product_reviews?status=eq.pending&order=created_at.desc", { method: "GET" });
}

export async function moderateReview(id: string, status: "approved" | "rejected"): Promise<void> {
  await supabaseRequest(`product_reviews?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status, reviewed_at: new Date().toISOString() }),
  });
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
