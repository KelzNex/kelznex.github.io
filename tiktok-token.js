export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Metode tidak diizinkan', { status: 405 });
    }

    try {
        const isi = await req.json();
        const { grant_type, code, refresh_token, redirect_uri } = isi;

        const data = new URLSearchParams();
        data.append('client_key', 'sbawrcr8glbyfki5hi');
        data.append('client_secret', '25DXmqlNpjHVZ0MZdmQRJAHaV0D4LMt8');
        data.append('grant_type', grant_type);

        if (grant_type === 'authorization_code') {
            data.append('code', code);
            data.append('redirect_uri', redirect_uri);
        } else if (grant_type === 'refresh_token') {
            data.append('refresh_token', refresh_token);
        }

        const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        });

        return Response.json(await res.json());
    } catch (er) {
        return Response.json({ error: 'Permintaan tidak sah' }, { status: 400 });
    }
}
