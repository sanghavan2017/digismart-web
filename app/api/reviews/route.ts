import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/kv";
import { createReview, listApprovedReviewsByProduct, getApprovedRatingSummaryByProduct } from "@/lib/supabase";
import { products } from "@/data/products";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

// Chống HTML injection khi hiển thị lại nhận xét trên trang — cùng cách app/api/lead/route.ts đang làm.
function esc(s: unknown) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(req: NextRequest) {
  const productSlug = req.nextUrl.searchParams.get("product_slug");
  try {
    if (productSlug) {
      const reviews = await listApprovedReviewsByProduct(productSlug);
      const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
      return NextResponse.json({ reviews, avg, count: reviews.length });
    }
    // Không có product_slug: trả rating trung bình của TẤT CẢ sản phẩm có đánh giá — dùng cho thẻ sản phẩm ở trang danh mục.
    const summary = await getApprovedRatingSummaryByProduct();
    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Get reviews error:", err);
    return NextResponse.json({ error: "Không tải được đánh giá." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: tối đa 5 đánh giá / 10 phút / IP — cùng hạn mức với form lead, chống spam.
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`review:${ip}`, 5, 600);
    if (!allowed) {
      return NextResponse.json(
        { error: "Bạn đã gửi đánh giá nhiều lần, vui lòng thử lại sau." },
        { status: 429 }
      );
    }

    const { productSlug, reviewerName, rating, comment } = await req.json();

    if (!productSlug || !reviewerName || !comment) {
      return NextResponse.json({ error: "Thiếu thông tin đánh giá." }, { status: 400 });
    }
    const ratingNum = Math.round(Number(rating));
    if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Số sao không hợp lệ." }, { status: 400 });
    }
    if (String(reviewerName).length > 100 || String(comment).length > 1000) {
      return NextResponse.json({ error: "Nội dung quá dài." }, { status: 400 });
    }
    if (!products.find(p => p.id === productSlug)) {
      return NextResponse.json({ error: "Sản phẩm không hợp lệ." }, { status: 400 });
    }

    const review = await createReview({
      productSlug,
      reviewerName: esc(reviewerName),
      rating: ratingNum,
      comment: esc(comment),
    });

    return NextResponse.json({ ok: true, review });
  } catch (err) {
    console.error("Create review error:", err);
    return NextResponse.json({ error: "Đã có lỗi xảy ra, vui lòng thử lại sau." }, { status: 500 });
  }
}
