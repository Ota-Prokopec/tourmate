import * as messaging from 'firebase-admin/messaging';
declare const _default: () => {
    create: ({ title, body, imageUrl, icon, color, clickAction, visibility, redirectionLink, }: {
        title?: string | undefined;
        body?: string | undefined;
        imageUrl?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
        clickAction?: string | undefined;
        visibility?: "private" | "public" | "secret" | undefined;
        redirectionLink?: string | undefined;
    }, tokens: string[]) => Promise<messaging.BatchResponse>;
};
export default _default;
//# sourceMappingURL=notification.d.ts.map