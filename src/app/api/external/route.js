import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const type = await searchParams.get("type");
  try {
    const res = await fetch(
      `https://berita-indo-api-next.vercel.app/api/cnn-news/${type}`,
      {
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return NextResponse.json({
      data: data.data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
