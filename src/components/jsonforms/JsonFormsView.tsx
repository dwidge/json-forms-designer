// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button } from "@dwidge/json-forms-paper";
import ErrorBoundary from "react-native-error-boundary";
import { JsonFormData } from "../../types/JsonFormData.js";
// import { JsonFormPdfExportButton } from "./JsonFormPdf.js";
import React from "react";
import {
  defaultJsonSchemaObject,
  defaultUISchemaElementType,
} from "../../types/index.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { JsonFormView } from "./JsonFormView.js";

export const JsonFormsView = ({
  schema = defaultJsonSchemaObject,
  uischema = defaultUISchemaElementType,
  data: [data, setData] = useStateWithOptionalSetter<JsonFormData>({}),
}) => (
  <>
    {/* <JsonFormPdfExportButton {...{ schema, uischema, data }} /> */}
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <JsonFormView
        schema={schema}
        uischema={uischema}
        data={[data, setData]}
      />
    </ErrorBoundary>
    {setData && <Button onPress={() => setData({})}>Reset</Button>}
  </>
);
