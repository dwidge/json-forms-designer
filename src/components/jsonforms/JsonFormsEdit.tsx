// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button, TextInput, View } from "@dwidge/json-forms-paper";
import React, { useState } from "react";
import ErrorBoundary from "react-native-error-boundary";
import {
  defaultJsonSchemaObject,
  defaultJsonSchemaObjectWithPropertyArray,
  JsonSchemaObject,
} from "../../types/index.js";
import {
  convertPropertiesArrayToPropertiesObjectRecursively,
  convertPropertiesObjectToPropertiesArrayRecursively,
} from "../../types/convertProperties.js";
import { useBufferedState } from "../../utils/useBufferedState.js";
import { useSyncedState } from "../../utils/useSyncedState.js";
import { JsonSchemaEdit } from "./JsonSchemaEdit.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";

export const JsonFormsData = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaObject>(
    defaultJsonSchemaObject
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
        <JsonFormsDataJson schema={[schema, setSchema]} />
      ) : (
        <JsonFormsDataGui schema={[schema, setSchema]} />
      )}
    </ErrorBoundary>
  </>
);

export const JsonFormsDataGui = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaObject>(
    defaultJsonSchemaObject
  ),
  editSchema: [editSchema, setEditSchema, error] = useSyncedState(
    defaultJsonSchemaObjectWithPropertyArray,
    [schema, setSchema],
    convertPropertiesObjectToPropertiesArrayRecursively,
    convertPropertiesArrayToPropertiesObjectRecursively
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
        disabled={bufferedSchema === defaultJsonSchemaObjectWithPropertyArray}
        onPress={() =>
          setBufferedSchema(defaultJsonSchemaObjectWithPropertyArray)
        }
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
      <JsonSchemaEdit jsonschema={[bufferedSchema, setBufferedSchema]} />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);

const convertStringToJsonSchemaObject = (s: string): JsonSchemaObject =>
  JsonSchemaObject.parse(JSON.parse(s));
const convertJsonSchemaObjectToString = (o: JsonSchemaObject): string =>
  JSON.stringify(o, null, 2);

export const JsonFormsDataJson = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaObject>(
    defaultJsonSchemaObject
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
    convertJsonSchemaObjectToString,
    convertStringToJsonSchemaObject
  ),
  debouncedSchema: [debouncedSchema, setDebouncedSchema] = useBufferedState(
    [editSchema, setEditSchema],
    true,
    1500
  ),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        disabled={bufferedSchema === defaultJsonSchemaObject}
        onPress={() => setBufferedSchema(defaultJsonSchemaObject)}
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
