import { getCsrfToken } from './csrf';

export async function findByGameId(gameId) {
    try {
        const response = await fetch(`/api/games/${gameId}/achievements`);
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
                achievements: payload
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not load achievements.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}

export async function rate(gameId, achievementId, difficultyRating) {
    const token = getCsrfToken();
    if (token === undefined) {

        return {
            ok: false,
            status: 0,
            errors: ['Missing CSRF token. Please refresh and try again.']
        };
    }

    try {
        const response = await fetch(`/api/games/${gameId}/achievements/${achievementId}/rating`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': token,
            },
            body: JSON.stringify({ difficultyRating })
        });

        if (response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (payload === null) {

                return {
                    ok: false,
                    status: 200,
                    errors: ['Unexpected response from server.']
                };
            }

            return {
                ok: true,
                achievement: payload
            };
        }

        if (response.status === 400) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 400,
                errors: Array.isArray(body) ? body : ['Could not save your rating.']
            };
        }

        if (response.status === 401) {

            return {
                ok: false,
                status: 401,
                errors: ['You must be logged in to rate an achievement.']
            };
        }

        if (response.status === 404) {

            return {
                ok: false,
                status: 404,
                errors: ['That achievement could not be found.']
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not save your rating.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}
