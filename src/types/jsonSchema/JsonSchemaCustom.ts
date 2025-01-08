import { z } from "zod";
import { JsonSchemaStandard } from "./JsonSchemaStandard";

export const JsonSchemaCustom = JsonSchemaStandard.extend({
  definitions: z.array(z.lazy(() => JsonSchemaCustom)).optional(),
  properties: z
    .lazy(() => JsonSchemaCustom)
    .array()
    .optional(),
  type: z
    .enum(["object", "array", "string", "number", "integer", "boolean", "null"])
    .optional(),
  items: z.lazy(() => JsonSchemaCustom).optional(),
});
export type JsonSchemaCustom = z.infer<typeof JsonSchemaCustom>;
export const defaultJsonSchemaCustom: JsonSchemaCustom = {
  type: "object",
  properties: [],
};
