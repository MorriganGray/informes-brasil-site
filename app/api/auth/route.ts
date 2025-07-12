import { NextRequest, NextResponse } from 'next/server';

// Define a interface para a resposta do GitHub
interface GitHubTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

const client_id = process.env.OAUTH_CLIENT_ID;
const client_secret = process.env.OAUTH_CLIENT_SECRET;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

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

    // Usa a nova interface para tipar a resposta
    const data: GitHubTokenResponse = await response.json();

    if (data.error) {
        return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    // Passa o objeto completo para o script
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
            // Verifica se a mensagem é do tipo esperado
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

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}