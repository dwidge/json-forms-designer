// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import {
  convertJsonFormDataToString,
  convertStringToJsonFormData,
  defaultJsonFormData,
  defaultJsonFormDataString,
} from "../types/index.js";
import { State } from "../utils/State.js";
import { useStateWithOptionalSetter } from "../utils/useStateWithOptionalSetter.js";
import { useSyncedState } from "../utils/useSyncedState.js";
import {
  convertFormSchemaToString,
  convertStringToFormSchema,
  defaultFormSchema,
  defaultFormSchemaString,
} from "../types/FormSchema.js";
import { FormEdit } from "./jsonforms/FormEdit.js";

export const FormSubmit = ({
  schemaString: [
    schemaString,
    setSchemaString,
  ] = useStateWithOptionalSetter<string>(
    defaultFormSchemaString,
  ) as State<string>,
  schema: [schema, setSchema, schemaError] = useSyncedState(
    defaultFormSchema,
    [schemaString, setSchemaString],
    convertStringToFormSchema,
    convertFormSchemaToString,
  ),
  dataString: [dataString, setDataString] = useStateWithOptionalSetter<string>(
    defaultJsonFormDataString,
  ),
  data: [data, setData, dataError] = useSyncedState(
    defaultJsonFormData,
    [dataString, setDataString],
    convertStringToJsonFormData,
    convertJsonFormDataToString,
  ),
}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <FormEdit
      schema={schema.schema}
      uischema={schema.uischema}
      data={[data, setData]}
    />
    {schemaError && <ErrorFallback error={schemaError} />}
  </ErrorBoundary>
);
