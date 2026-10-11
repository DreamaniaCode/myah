export function createSlug(text: string): string {
    if (!text) return '';

    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\u0621-\u064A\s-]/g, '') // Keep alphanumeric, arabic and spaces/hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove duplicate hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens
}

export function sanitizeSlug(slug: string): string {
    if (!slug) return '';

    return slug
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\u0621-\u064A-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}
