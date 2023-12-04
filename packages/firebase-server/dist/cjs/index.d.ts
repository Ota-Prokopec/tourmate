declare const notifications: {
    create: ({ title, body, imageUrl, icon, color, clickAction, visibility, redirectionLink, }: {
        title?: string | undefined;
        body?: string | undefined;
        imageUrl?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
        clickAction?: string | undefined;
        visibility?: "private" | "public" | "secret" | undefined;
        redirectionLink?: string | undefined;
    }, tokens: string[]) => Promise<import("firebase-admin/messaging").BatchResponse>;
};
export { notifications };
//# sourceMappingURL=index.d.ts.map