import { z } from "zod";

export const bodyTypeSchema = z.union([
  z.literal("suv"),
  z.literal("estate"),
  z.literal("sedan"),
]);

export const modelTypeSchema = z.union([
  z.literal("plug-in hybrid"),
  z.literal("pure electric"),
]);

export const carSchema = z.object({
  id: z.string(),
  modelName: z.string(),
  bodyType: bodyTypeSchema,
  modelType: modelTypeSchema,
  imageUrl: z.string(),
});

export type BodyType = z.infer<typeof bodyTypeSchema>;
export type ModelType = z.infer<typeof modelTypeSchema>;
export type Car = z.infer<typeof carSchema>;
