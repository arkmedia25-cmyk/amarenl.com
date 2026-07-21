import { NextRequest, NextResponse } from "next/server";

/**
 * Pinterest OAuth callback — yakalar ve token alır.
 * GET /api/pinterest/callback?code=...&state=...
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: `Kullanıcı reddetti: ${error}` }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Authorization code eksik" }, { status: 400 });
  }

  const clientId = process.env.PINTEREST_CLIENT_ID || "1582959";
  const clientSecret = process.env.PINTEREST_CLIENT_SECRET;
  const redirectUri = "https://amarenl.com/api/pinterest/callback";

  if (!clientSecret) {
    return NextResponse.json({ error: "PINTEREST_CLIENT_SECRET sunucuda tanımlı değil" }, { status: 500 });
  }

  try {
    const tokenRes = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok || !(data as any).access_token) {
      return NextResponse.json({ error: "Token alınamadı", detail: data }, { status: 500 });
    }

    const at = (data as any).access_token;
    const rt = (data as any).refresh_token;

    // Token'ları göster (güvenli değil ama geliştirme için)
    return NextResponse.json({
      success: true,
      access_token: at,
      refresh_token: rt,
      scopes: (data as any).scope,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
