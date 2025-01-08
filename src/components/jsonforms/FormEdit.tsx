// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button, Text, View } from "@dwidge/json-forms-paper";
import ErrorBoundary from "react-native-error-boundary";
import { JsonFormData } from "../../types/JsonFormData.js";
// import { JsonFormPdfExportButton } from "./JsonFormPdf.js";
import { useOptionalState } from "@dwidge/hooks-react";
import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";
import React from "react";
import {
  defaultJsonSchemaStandard,
  defaultUISchemaElementType,
  UISchemaElementType,
} from "../../types/index.js";
import { JsonSchema7, UISchemaElement } from "@jsonforms/core";

export const FormEdit = ({
  schema = defaultJsonSchemaStandard,
  uischemas = [defaultUISchemaElementType],
  data: [data, setData] = useOptionalState<JsonFormData>(null),
  onReset = setData
    ? () => {
        setData(null);
      }
    : undefined,
  editMode: [editMode, setEditMode] = useOptionalState<"gui" | "json">("gui"),
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
        <FormJson
          schema={schema}
          uischemas={uischemas}
          data={[data, setData]}
        />
      ) : (
        <FormGui schema={schema} uischemas={uischemas} data={[data, setData]} />
      )}
    </ErrorBoundary>
  </>
);

const FormGui = ({
  schema = defaultJsonSchemaStandard,
  uischemas = [defaultUISchemaElementType],
  data: [data, setData] = useOptionalState<JsonFormData>(null),
}) => (
  <>
    <JsonForms
      renderers={paperRenderers}
      cells={paperCells}
      schema={schema}
      uischema={uischemas[0] as UISchemaElement}
      uischemas={uischemas.map(
        (
          s: UISchemaElementType,
          i,
          a,
          ref = s.options?.ref as string | undefined,
        ) => ({
          tester: (schema, schemaPath: string, path: string) =>
            ref && schemaPath.includes(ref.slice(1)) ? 2 : -1,
          uischema: s as UISchemaElement,
        }),
      )}
      data={data}
      onChange={setData && (({ data }) => setData(data))}
    />
  </>
);

const FormJson = ({
  schema = defaultJsonSchemaStandard,
  uischemas = [defaultUISchemaElementType],
  data: [data, setData] = useOptionalState<JsonFormData>(null),
}) => <Text>{JSON.stringify(data, null, 2)}</Text>;
