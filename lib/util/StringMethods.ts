export function replaceAll(str: any, search: any, replace: any) {
    return str.replace(new RegExp('' + search + '', 'g'), replace);
}