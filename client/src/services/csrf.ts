const PREFIX = 'XSRF-TOKEN=';

export function getCsrfToken(): string | undefined {
    const token = document.cookie.split('; ').find(e => e.startsWith(PREFIX));

    return token?.slice(PREFIX.length);
}
