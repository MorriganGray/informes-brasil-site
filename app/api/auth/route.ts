import { NextRequest, NextResponse } from 'next/server';

const client_id = process.env.OAUTH_CLIENT_ID;
const client_secret = process.env.OAUTH_CLIENT_SECRET;
const redirect_uri = 'https://informesbrasil.vercel.app/api/auth'; // A nossa própria URL

// Lida com o início do fluxo de autenticação
function handleInitialAuth() {
  const params = new URLSearchParams({
    client_id: client_id || '',
    redirect_uri: redirect_uri,
    scope: 'repo,user',
    response_type: 'code',
  });
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.redirect(url);
}

// Lida com o retorno do GitHub com o código
async function handleCallback(code: string) {
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data: any = await response.json();

    if (data.error) {
      console.error('GitHub OAuth Error:', data.error_description);
      return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    const tokenData = JSON.stringify({
      token: data.access_token,
      provider: 'github'
    });

    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Authenticating...</title></head>
      <body>
        <script>
          const receiveMessage = (event) => {
            if (event.data === 'authorizing:github') {
              window.opener.postMessage(
                'authorization:github:success:${tokenData}',
                event.origin
              );
              window.close();
            }
          };
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        </script>
      </body>
      </html>
    `;

    return new NextResponse(content, { headers: { 'Content-Type': 'text/html' } });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error during token exchange' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  // Se não houver código, é a fase 1. Redireciona para o GitHub.
  if (!code) {
    return handleInitialAuth();
  }
  
  // Se houver código, é a fase 2. Troca o código pelo token.
  return handleCallback(code);
}