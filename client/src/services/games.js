export async function findById(id) {
    try {
        const response = await fetch(`/api/games/${id}`);

        if (response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (payload === null) {

                return {
                    ok: false,
                    status: 200,
                    errors: ['Unexpected response from the server.']
                };
            }

            return {
                ok: true,
                game: payload
            };
        }

        if (response.status === 404) {

            return {
                ok: false,
                status: 404,
                errors: ['That game could not be found.']
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not load this game.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}

export async function search(q) {
    const url = q ? `/api/games?q=${encodeURIComponent(q)}` : '/api/games';

    try {
        const response = await fetch(url);

        if (response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (!Array.isArray(payload)) {

                return {
                    ok: false,
                    status: 200,
                    errors: ['Unexpected response from the server.']
                };
            }

            return {
                ok: true,
                games: payload
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not search games.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}
