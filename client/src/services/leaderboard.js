export async function findAll() {
    try {
        const response = await fetch('/api/leaderboard');
        if (response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (!Array.isArray(payload)) {

                return {
                    ok: false,
                    status: 200,
                    errors: ['Unexpected response from server.']
                };
            }

            return {
                ok: true,
                rows: payload
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not load leaderboard']
        };
    } catch {
        return {
            ok: false,
            status: 0,
            errors: ['Could not load leaderboard']
        };
    }
}