// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import { Button, TextInput, View } from "@dwidge/json-forms-paper";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import {
  defaultJsonSchemaObject,
  defaultUISchemaElementType,
  JsonSchemaObject,
  UISchemaElementType,
} from "../../types/index.js";
import { useBufferedState } from "../../utils/useBufferedState.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { useSyncedState } from "../../utils/useSyncedState.js";
import { UiSchemaEdit } from "./UiSchemaEdit.js";

const identityFunction = <T,>(x: T) => x;

export const JsonFormsLayout = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaObject>(
    defaultJsonSchemaObject
  ),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType
  ),
  editMode: [editMode, setEditMode] = useStateWithOptionalSetter<
    "json" | "gui"
  >("gui"),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        onPress={setEditMode && (() => setEditMode("gui"))}
        className={editMode === "gui" ? "selected" : ""}
      >
        Gui
      </Button>
      <Button
        onPress={setEditMode && (() => setEditMode("json"))}
        className={editMode === "json" ? "selected" : ""}
      >
        Json
      </Button>
    </View>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {editMode === "json" ? (
        <JsonFormsLayoutJson uischema={[uischema, setUischema]} />
      ) : (
        <JsonFormsLayoutGui
          schema={[schema, setSchema]}
          uischema={[uischema, setUischema]}
        />
      )}
    </ErrorBoundary>
  </>
);

export const JsonFormsLayoutGui = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaObject>(
    defaultJsonSchemaObject
  ),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType
  ),
  editUiSchema: [editUiSchema, setEditUiSchema, error] = useSyncedState(
    defaultUISchemaElementType,
    [uischema, setUischema],
    identityFunction,
    identityFunction
  ),
  bufferedUiSchema: [
    bufferedUiSchema,
    setBufferedUiSchema,
    changed,
    save,
    revert,
  ] = useBufferedState([editUiSchema, setEditUiSchema]),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        disabled={bufferedUiSchema === defaultUISchemaElementType}
        onPress={() => setBufferedUiSchema(defaultUISchemaElementType)}
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
      <UiSchemaEdit
        jsonschema={[schema, setSchema]}
        uischema={[bufferedUiSchema, setBufferedUiSchema]}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);

const convertUiSchemaToString = (s: UISchemaElementType): string =>
  JSON.stringify(s, null, 2);
const convertStringToUiSchema = (s: string): UISchemaElementType =>
  UISchemaElementType.parse(JSON.parse(s));

export const JsonFormsLayoutJson = ({
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType
  ),
  bufferedUiSchema: [
    bufferedUiSchema,
    setBufferedUiSchema,
    changed,
    save,
    revert,
  ] = useBufferedState([uischema, setUischema]),
  editUiSchema: [editUiSchema, setEditUiSchema, error] = useSyncedState(
    "",
    [bufferedUiSchema, setBufferedUiSchema],
    convertUiSchemaToString,
    convertStringToUiSchema
  ),
  debouncedUiSchema: [
    debouncedUiSchema,
    setDebouncedUiSchema,
  ] = useBufferedState([editUiSchema, setEditUiSchema], true, 1500),
}) => (
  <>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        disabled={bufferedUiSchema === defaultUISchemaElementType}
        onPress={() => setBufferedUiSchema(defaultUISchemaElementType)}
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
        value={debouncedUiSchema}
        onChangeText={setDebouncedUiSchema}
        multiline
        style={{ flex: 1 }}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);
