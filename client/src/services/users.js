import { getCsrfToken } from './csrf';

export const PRESET_AVATARS = {
    CONTROLLER: '🎮',
    TROPHY: '🏆',
    ALIEN: '👾',
    JOYSTICK: '🕹️',
    GHOST: '👻',
    SWORD: '⚔️',
};

export async function updateAvatar(avatar) {
    const token = getCsrfToken();
    if (token === undefined) {

        return {
            ok: false,
            status: 0,
            errors: ['Missing CSRF token. Please refresh and try again.']
        };
    }

    try {
        const response = await fetch('/api/users/me/avatar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': token,
            },
            body: JSON.stringify({ avatar })
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
                avatar: payload
            };
        }

        if (response.status === 400) {
            const body = await response.json().catch(() => null);

            return {
                ok: false,
                status: 400,
                errors: Array.isArray(body) ? body : ['Could not change your picture.']
            };
        }

        return {
            ok: false,
            status: response.status,
            errors: ['Could not change your picture.']
        };
    } catch {

        return {
            ok: false,
            status: 0,
            errors: ['Could not reach the server. Please try again.']
        };
    }
}
