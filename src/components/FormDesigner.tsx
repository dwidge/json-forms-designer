// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { useOptionalState, useSyncedState } from "@dwidge/hooks-react";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import { FormThemeProvider } from "../themes/FormThemeProvider.js";
import {
  convertFormSchemaToString,
  convertStringToFormSchema,
  defaultFormSchema,
  defaultFormSchemaString,
} from "../types/FormSchema.js";
import { DesignerEdit } from "./jsonforms/DesignerEdit.js";

export const FormDesigner = ({
  schemaString: [schemaString, setSchemaString] = useOptionalState<string>(
    defaultFormSchemaString,
  ),
  schema: [schema, setSchema, error] = useSyncedState(
    defaultFormSchema,
    [schemaString, setSchemaString],
    convertStringToFormSchema,
    convertFormSchemaToString,
  ),
}) => (
  <FormThemeProvider>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DesignerEdit
        schema={[
          schema?.schema,
          setSchema &&
            ((
              schema,
              getSchema = typeof schema === "function" ? schema : () => schema,
            ) =>
              setSchema((prev) => ({
                ...prev,
                schema: getSchema(prev.schema),
              }))),
        ]}
        uischemas={[
          schema && [schema.uischema, ...(schema?.uischemas ?? [])],
          setSchema &&
            ((
              uischemas,
              getUischemas = typeof uischemas === "function"
                ? uischemas
                : () => uischemas,
            ) =>
              setSchema(
                (
                  prev,
                  [uischema, ...uischemas] = getUischemas(prev.uischemas ?? []),
                ) => ({
                  ...prev,
                  uischema,
                  uischemas,
                }),
              )),
        ]}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </FormThemeProvider>
);
