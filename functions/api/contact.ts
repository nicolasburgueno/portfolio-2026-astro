interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  CONTACT_TO?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const onRequestPost: (context: {
  request: Request;
  env: Env;
}) => Promise<Response> = async (context) => {
  const { RESEND_API_KEY, RESEND_FROM, CONTACT_TO } = context.env;

  if (!RESEND_API_KEY) {
    return Response.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  let body: ContactPayload;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const from = RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>';
  const to = CONTACT_TO ?? 'nburgueno.dev@gmail.com';

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#0c1219;padding:24px 32px;border-radius:12px 12px 0 0;border-bottom:2px solid #47B4CC;">
        <h2 style="margin:0;color:#47B4CC;font-size:18px;font-weight:600;">
          New message from your portfolio
        </h2>
      </div>
      <div style="background:#f9f9f9;padding:24px 32px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:6px 0;color:#666;width:70px;vertical-align:top;">From:</td>
            <td style="padding:6px 0;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;vertical-align:top;">Subject:</td>
            <td style="padding:6px 0;">${escapeHtml(subject)}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
        <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <div style="background:#eee;padding:12px 32px;border-radius:0 0 12px 12px;font-size:12px;color:#888;">
        Sent from nicolasburgueno.dev
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[contact] Resend error:', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ success: true });
};
