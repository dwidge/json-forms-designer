// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import { useStateWithOptionalSetter } from "../utils/useStateWithOptionalSetter.js";
import { useSyncedState } from "../utils/useSyncedState.js";
import {
  convertFormSchemaToString,
  convertStringToFormSchema,
  defaultFormSchema,
  defaultFormSchemaString,
} from "./FormSchema.js";
import { JsonFormsDesigner } from "./jsonforms/JsonFormsDesigner.js";

export const FormDesigner = ({
  schemaString: [
    schemaString,
    setSchemaString,
  ] = useStateWithOptionalSetter<string>(defaultFormSchemaString),
  schema: [schema, setSchema, error] = useSyncedState(
    defaultFormSchema,
    [schemaString, setSchemaString],
    convertStringToFormSchema,
    convertFormSchemaToString
  ),
}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <JsonFormsDesigner
      schema={[
        schema.schema,
        setSchema &&
          ((schema) =>
            setSchema((prev) =>
              typeof schema === "function"
                ? { ...prev, schema: schema(prev.schema) }
                : { ...prev, schema }
            )),
      ]}
      uischema={[
        schema.uischema,
        setSchema &&
          ((uischema) => setSchema((prev) => ({ ...prev, uischema }))),
      ]}
    />
    {error && <ErrorFallback error={error} />}
  </ErrorBoundary>
);
