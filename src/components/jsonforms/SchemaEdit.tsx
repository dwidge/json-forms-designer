// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button, TextInput, View } from "@dwidge/json-forms-paper";
import React, { useState } from "react";
import ErrorBoundary from "react-native-error-boundary";
import { useBufferedState } from "../../utils/useBufferedState.js";
import { useSyncedState } from "../../utils/useSyncedState.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import {
  convertJsonSchemaStandardToString,
  convertStringToJsonSchemaStandard,
  defaultJsonSchemaStandard,
  JsonSchemaStandard,
} from "../../types/jsonSchema/JsonSchemaStandard.js";
import { defaultJsonSchemaCustom } from "../../types/jsonSchema/JsonSchemaCustom.js";
import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";
import {
  editingSchema,
  jsonschemaUischema,
} from "../../schemas/jsonschemaSchema.js";
import {
  convertJsonSchemaCustomToStandard,
  convertJsonSchemaStandardToCustom,
  JsonSchemaCustom,
} from "../../types/index.js";

export const SchemaEdit = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaStandard>(
    defaultJsonSchemaStandard,
  ),
  editMode: [editMode, setEditMode] = useState<"json" | "gui">("gui"),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        onPress={() => setEditMode("gui")}
        className={editMode === "gui" ? "selected" : ""}
      >
        Gui
      </Button>
      <Button
        onPress={() => setEditMode("json")}
        className={editMode === "json" ? "selected" : ""}
      >
        Json
      </Button>
    </View>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {editMode === "json" ? (
        <SchemaJsonEdit schema={[schema, setSchema]} />
      ) : (
        <SchemaGuiEdit schema={[schema, setSchema]} />
      )}
    </ErrorBoundary>
  </>
);

const SchemaGuiEdit = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaStandard>(
    defaultJsonSchemaStandard,
  ),
  editSchema: [editSchema, setEditSchema, error] = useSyncedState(
    defaultJsonSchemaCustom,
    [schema, setSchema],
    convertJsonSchemaStandardToCustom,
    convertJsonSchemaCustomToStandard,
  ),
  bufferedSchema: [
    bufferedSchema,
    setBufferedSchema,
    changed,
    save,
    revert,
  ] = useBufferedState([editSchema, setEditSchema]),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        disabled={bufferedSchema === defaultJsonSchemaCustom}
        onPress={() => setBufferedSchema(defaultJsonSchemaCustom)}
      >
        Clear
      </Button>
      <Button disabled={!changed} onPress={revert}>
        Revert
      </Button>
      <Button disabled={!changed} onPress={save}>
        Save
      </Button>
    </View>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SchemaGui jsonschema={[bufferedSchema, setBufferedSchema]} />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);

const SchemaJsonEdit = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaStandard>(
    defaultJsonSchemaStandard,
  ),
  bufferedSchema: [
    bufferedSchema,
    setBufferedSchema,
    changed,
    save,
    revert,
  ] = useBufferedState([schema, setSchema]),
  editSchema: [editSchema, setEditSchema, error] = useSyncedState(
    "",
    [bufferedSchema, setBufferedSchema],
    convertJsonSchemaStandardToString,
    convertStringToJsonSchemaStandard,
  ),
  debouncedSchema: [debouncedSchema, setDebouncedSchema] = useBufferedState(
    [editSchema, setEditSchema],
    true,
    1500,
  ),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        disabled={bufferedSchema === defaultJsonSchemaStandard}
        onPress={() => setBufferedSchema(defaultJsonSchemaStandard)}
      >
        Clear
      </Button>
      <Button disabled={!changed} onPress={revert}>
        Revert
      </Button>
      <Button disabled={!changed} onPress={save}>
        Save
      </Button>
    </View>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TextInput
        error={!!error}
        value={debouncedSchema}
        onChangeText={setDebouncedSchema}
        multiline
        style={{ flex: 1 }}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);

const SchemaGui = ({
  jsonschema: [jsonschema, setSchema] = useState<JsonSchemaCustom>(
    defaultJsonSchemaCustom,
  ),
}) => (
  <JsonForms
    renderers={paperRenderers}
    cells={paperCells}
    schema={editingSchema}
    uischema={jsonschemaUischema}
    uischemas={[
      {
        tester: (schema) => (schema && schema.type === "object" ? 2 : -1),
        uischema: jsonschemaUischema,
      },
    ]}
    data={jsonschema}
    onChange={({ data }) => setSchema(data)}
  />
);
