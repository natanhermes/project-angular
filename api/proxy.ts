import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { court, payload } = req.body as { court: string; payload: any };
    const url = `https://api-publica.datajud.cnj.jus.br/${court}/_search`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==`
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao acessar API externa' });
    }
}
