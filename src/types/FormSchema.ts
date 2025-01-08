// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import z from "zod";
import { JsonSchemaStandard } from "./jsonSchema/JsonSchemaStandard.js";
import {
  defaultUISchemaElementType,
  UISchemaElementType,
} from "./UISchemaElement.js";

export const FormSchema = z.object({
  schema: JsonSchemaStandard,
  uischema: UISchemaElementType,
  uischemas: UISchemaElementType.array().optional(),
});
export type FormSchema = {
  schema: JsonSchemaStandard;
  uischema: UISchemaElementType;
  uischemas?: UISchemaElementType[];
};

export const defaultFormSchema: FormSchema = {
  schema: {
    type: "object",
    properties: {},
  },
  uischema: defaultUISchemaElementType,
  uischemas: [],
};
export const defaultFormSchemaString: string =
  JSON.stringify(defaultFormSchema);

export const convertFormSchemaToString = (s: FormSchema): string =>
  JSON.stringify(s);
export const convertStringToFormSchema = (s: string): FormSchema =>
  FormSchema.parse({ ...defaultFormSchema, ...JSON.parse(s) }) as any;
