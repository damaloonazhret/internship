export function extractHashFromLink(link) {
    return link.href.split('#')[1];
}