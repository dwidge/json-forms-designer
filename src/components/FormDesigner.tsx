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
            ((schema) =>
              setSchema((prev) =>
                typeof schema === "function"
                  ? { ...prev, schema: schema(prev.schema) }
                  : { ...prev, schema },
              )),
        ]}
        uischema={[
          schema?.uischema,
          setSchema &&
            ((uischema) => setSchema((prev) => ({ ...prev, uischema }))),
        ]}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </FormThemeProvider>
);
