import { Client, Locale as LocaleAppwrite } from 'appwrite';
export type Location = [number, number];
export default class Locale extends LocaleAppwrite {
    protected locale: LocaleAppwrite;
    constructor(client: Client);
}
//# sourceMappingURL=locale.d.ts.map