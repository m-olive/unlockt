import { getCsrfToken } from './csrf';

export async function link(rawInput) {
    const token = getCsrfToken();
    if (token === undefined) {

        return {
            ok: false,
            status: 0,
            errors: ['Missing CSRF token. Please refresh and try again.']
        };
    }

    try {
        const response = await fetch('/api/steam/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': token,
            },
            body: JSON.stringify({ linkInput: rawInput })
        });

        if (response.status === 204) {

            return {
                ok: true
            };
        }

        if (response.status === 400) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 400,
                errors: Array.isArray(body) ? body : ['Could not link your Steam account.']
            };
        }

        if (response.status === 401) {

            return {
                ok: false,
                status: 401,
                errors: ['You must be logged in to link a Steam account.']
            };
        }

        if (response.status === 404) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 404,
                errors: Array.isArray(body) ? body : ['We could not find a Steam account with that name.']
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not link your Steam account.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}

export async function doImport() {
    const token = getCsrfToken();
    if (token === undefined) {

        return {
            ok: false,
            status: 0,
            errors: ['Missing CSRF token. Please refresh and try again.']
        };
    }

    try {
        const response = await fetch('/api/steam/import', {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': token,
            }
        });

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
                summary: payload
            };
        }

        if (response.status === 400) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 400,
                errors: Array.isArray(body) ? body : ['Could not import your Steam library.']
            };
        }

        if (response.status === 401) {

            return {
                ok: false,
                status: 401,
                errors: ['You must be logged in to import your Steam library.']
            };
        }

        if (response.status === 404) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 404,
                errors: Array.isArray(body) ? body : ['Could not import your Steam library.']
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not import your Steam library.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}
