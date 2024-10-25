// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import z from "zod";
import { defaultUISchemaElementType, UISchemaElementType } from "./index.js";
import { JsonSchemaStandard } from "./jsonSchema/JsonSchemaStandard.js";

export const FormSchema = z.object({
  schema: JsonSchemaStandard,
  uischema: UISchemaElementType,
});
export type FormSchema = z.infer<typeof FormSchema>;

export const defaultFormSchema: FormSchema = {
  schema: {
    type: "object",
    properties: {},
  },
  uischema: defaultUISchemaElementType,
};
export const defaultFormSchemaString: string =
  JSON.stringify(defaultFormSchema);

export const convertFormSchemaToString = (s: FormSchema): string =>
  JSON.stringify(s);
export const convertStringToFormSchema = (s: string): FormSchema =>
  FormSchema.parse({ ...defaultFormSchema, ...JSON.parse(s) });
