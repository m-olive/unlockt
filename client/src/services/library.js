export const STATUS_OPTIONS = [
    { value: 'BACKLOG', label: 'Backlog' },
    { value: 'PLAYING', label: 'Playing' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'DROPPED', label: 'Dropped' },
];

export async function findAll(filters) {
    const params = new URLSearchParams();
    if (filters.status) {
        params.set('status', filters.status);
    }
    if (filters.genre) {
        params.set('genre', filters.genre);
    }
    if (filters.platform) {
        params.set('platform', filters.platform);
    }
    if (filters.sort) {
        params.set('sort', filters.sort);
    }

    const query = params.toString();
    const url = query ? `/api/library?${query}` : '/api/library';

    try {
        const response = await fetch(url);

        if (response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (!Array.isArray(payload)) {
                return { ok: false, status: 200, errors: ['Unexpected response from the server.'] };
            }
            return { ok: true, entries: payload };
        }

        if (response.status === 400) {
            const body = await response.json().catch(() => null);
            return {
                ok: false,
                status: 400,
                errors: Array.isArray(body) ? body : ['Could not load your library.']
            };
        }

        return { ok: false, status: response.status, errors: ['Could not load your library.'] };
    } catch {
        return { ok: false, status: 0, errors: ['Could not reach the server. Please try again.'] };
    }
}