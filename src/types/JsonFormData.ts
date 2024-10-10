// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import z from "zod";
export const JsonFormData = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.lazy(() => JsonFormData)]).optional(),
);
export type JsonFormData = z.infer<typeof JsonFormData>;

export const defaultJsonFormData: JsonFormData = {};
export const defaultJsonFormDataString: string = "{}";

export const convertJsonFormDataToString = (s: JsonFormData): string =>
  JSON.stringify(s, null, 2);
export const convertStringToJsonFormData = (s: string): JsonFormData =>
  JsonFormData.parse({ ...defaultJsonFormData, ...JSON.parse(s) });
