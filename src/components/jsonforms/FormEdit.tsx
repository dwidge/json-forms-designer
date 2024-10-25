// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button, Text, View } from "@dwidge/json-forms-paper";
import ErrorBoundary from "react-native-error-boundary";
import { JsonFormData } from "../../types/JsonFormData.js";
// import { JsonFormPdfExportButton } from "./JsonFormPdf.js";
import React from "react";
import {
  defaultJsonSchemaStandard,
  defaultUISchemaElementType,
} from "../../types/index.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";

export const FormEdit = ({
  schema = defaultJsonSchemaStandard,
  uischema = defaultUISchemaElementType,
  data: [data, setData] = useStateWithOptionalSetter<JsonFormData>({}),
  onReset = setData
    ? () => {
        setData({});
      }
    : undefined,
  editMode: [editMode, setEditMode] = useStateWithOptionalSetter<
    "gui" | "json"
  >("gui"),
}) => (
  <>
    {setEditMode && (
      <View
        style={{
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={() => setEditMode("gui")}
          className={editMode === "gui" ? "selected" : ""}
        >
          GUI
        </Button>
        <Button
          onPress={() => setEditMode("json")}
          className={editMode === "json" ? "selected" : ""}
        >
          JSON
        </Button>
      </View>
    )}
    {/* <JsonFormPdfExportButton {...{ schema, uischema, data }} /> */}
    {onReset && <Button onPress={onReset}>Reset</Button>}
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {editMode === "json" ? (
        <FormJson schema={schema} uischema={uischema} data={[data, setData]} />
      ) : (
        <FormGui schema={schema} uischema={uischema} data={[data, setData]} />
      )}
    </ErrorBoundary>
  </>
);

const FormGui = ({
  schema = defaultJsonSchemaStandard,
  uischema = defaultUISchemaElementType,
  data: [data, setData] = useStateWithOptionalSetter({}),
}) => (
  <JsonForms
    renderers={paperRenderers}
    cells={paperCells}
    schema={schema}
    uischema={uischema}
    data={data}
    onChange={setData && (({ data }) => setData(data))}
  />
);

const FormJson = ({
  schema = defaultJsonSchemaStandard,
  uischema = defaultUISchemaElementType,
  data: [data, setData] = useStateWithOptionalSetter({}),
}) => <Text>{JSON.stringify(data, null, 2)}</Text>;
