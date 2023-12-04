import { z } from 'zod';
export declare const transportZod: z.ZodUnion<[z.ZodLiteral<"train">, z.ZodLiteral<"bus">, z.ZodLiteral<"car">, z.ZodLiteral<"walk">, z.ZodLiteral<"bike">]>;
export type Transport = z.infer<typeof transportZod>;
//# sourceMappingURL=Transport.d.ts.map