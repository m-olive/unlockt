const PREFIX = 'XSRF-TOKEN=';

export function getCsrfToken() {
    const token = document.cookie.split('; ').find(e => e.startsWith(PREFIX));

    return token?.slice(PREFIX.length);
}
