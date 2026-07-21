import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;text-align:center"><h1 style="color:red">❌ İzin reddedildi</h1><p>${error}</p></body></html>`,
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } }
    );
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

    const data = (await tokenRes.json()) as any;

    if (!tokenRes.ok || !data.access_token) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;padding:40px;text-align:center"><h1 style="color:red">❌ Token alınamadı</h1><pre>${JSON.stringify(data, null, 2)}</pre></body></html>`,
        { status: 500, headers: { "content-type": "text/html; charset=utf-8" } }
      );
    }

    const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><title>✅ Pinterest Bağlandı</title>
<style>
  body { font-family: -apple-system, sans-serif; max-width: 700px; margin: 60px auto; padding: 20px; background: #f9f6ff; }
  .card { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 24px rgba(107,76,140,0.12); }
  h1 { color: #4CAF50; margin: 0 0 8px; }
  .sub { color: #6b6b6b; margin: 0 0 24px; }
  .token-box { background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; word-break: break-all; font-family: monospace; font-size: 12px; line-height: 1.6; margin: 12px 0; user-select: all; }
  .label { font-weight: 700; color: #6B4C8C; font-size: 13px; margin: 16px 0 4px; }
  .expiry { color: #c8a951; font-weight: 600; }
  button { background: #6B4C8C; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-size: 14px; cursor: pointer; margin-top: 20px; }
  button:hover { background: #9B7FBE; }
</style></head>
<body>
<div class="card">
  <h1>✅ Pinterest Bağlandı!</h1>
  <p class="sub">Token başarıyla alındı. Aşağıdaki token'ı Hermes'e ilet.</p>
  <div class="label">🔑 Access Token <span class="expiry">(${data.expires_in ? Math.round(data.expires_in / 3600) + ' saat' : 'süresiz'})</span></div>
  <div class="token-box" id="access">${data.access_token}</div>
  <button onclick="navigator.clipboard.writeText(document.getElementById('access').textContent);this.textContent='✅ Kopyalandı!'">📋 Kopyala</button>
  ${data.refresh_token ? `
  <div class="label">🔄 Refresh Token</div>
  <div class="token-box">${data.refresh_token}</div>
  ` : ''}
  <p style="margin-top:20px;font-size:12px;color:#999">Bu sayfayı kapatabilirsin.</p>
</div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
