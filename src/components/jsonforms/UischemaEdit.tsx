// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ErrorFallback } from "@dwidge/fallback-rnw";
import {
  Button,
  paperCells,
  paperRenderers,
  TextInput,
  View,
} from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";
import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import {
  uischemaSchema,
  uischemaUischema,
} from "../../schemas/uischemaSchema.js";
import {
  convertStringToUiSchema,
  convertUiSchemaToString,
  defaultUISchemaElementType,
  UISchemaElementType,
} from "../../types/index.js";
import {
  defaultJsonSchemaStandard,
  JsonSchemaStandard,
} from "../../types/jsonSchema/JsonSchemaStandard.js";
import { buildRefs } from "../../utils/buildRefs.js";
import { deepMerge } from "../../utils/deepMerge.js";
import { useBufferedState } from "../../utils/useBufferedState.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { useSyncedState } from "../../utils/useSyncedState.js";

export const UischemaEdit = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaStandard>(
    defaultJsonSchemaStandard,
  ),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType,
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
        <UischemaJsonEdit uischema={[uischema, setUischema]} />
      ) : (
        <UischemaGuiEdit
          schema={[schema, setSchema]}
          uischema={[uischema, setUischema]}
        />
      )}
    </ErrorBoundary>
  </>
);

const identityFunction = <T,>(x: T) => x;

const UischemaGuiEdit = ({
  schema: [schema, setSchema] = useStateWithOptionalSetter<JsonSchemaStandard>(
    defaultJsonSchemaStandard,
  ),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType,
  ),
  editUiSchema: [editUiSchema, setEditUiSchema, error] = useSyncedState(
    defaultUISchemaElementType,
    [uischema, setUischema],
    identityFunction,
    identityFunction,
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
      <UischemaGui
        jsonschema={[schema, setSchema]}
        uischema={[bufferedUiSchema, setBufferedUiSchema]}
      />
      {error && <ErrorFallback error={error} />}
    </ErrorBoundary>
  </>
);

const UischemaJsonEdit = ({
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType,
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
    convertStringToUiSchema,
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

const addScopesEnum = (scopes: string[]) =>
  deepMerge(uischemaSchema, {
    definitions: {
      property: {
        properties: {
          scope: {
            enum: scopes.length ? scopes : undefined,
          },
        },
      },
    },
    properties: {
      scope: {
        enum: scopes.length ? scopes : undefined,
      },
    },
  });

const UischemaGui = ({
  jsonschema: [jsonschema] = useStateWithOptionalSetter<JsonSchemaStandard>({
    type: "object",
  }),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType,
  ),
  scopes = ["#", ...buildRefs(jsonschema)],
}) => (
  <JsonForms
    renderers={paperRenderers}
    cells={paperCells}
    schema={addScopesEnum(scopes)}
    uischema={uischemaUischema}
    uischemas={[
      {
        tester: (schema) => (schema && schema.type === "object" ? 2 : -1),
        uischema: uischemaUischema,
      },
    ]}
    data={uischema}
    onChange={setUischema && (({ data }) => setUischema(data))}
  />
);
