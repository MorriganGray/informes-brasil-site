import { NextRequest, NextResponse } from 'next/server';

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

    const data: any = await response.json();

    if (data.error) {
        return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Authenticating...</title></head>
      <body>
        <script>
          const receiveMessage = (event) => {
            if (event.data === 'authorizing:github') {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify(data)}',
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