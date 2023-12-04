import { z } from 'zod';
export declare const topicZod: z.ZodUnion<[z.ZodLiteral<"castle">, z.ZodLiteral<"monument">, z.ZodLiteral<"person">, z.ZodLiteral<"animals">, z.ZodLiteral<"hiking">]>;
export type Topic = z.infer<typeof topicZod>;
//# sourceMappingURL=Topic.d.ts.map