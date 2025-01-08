// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useOptionalState } from "@dwidge/hooks-react";
import { Button, View } from "@dwidge/json-forms-paper";
import React, { useState } from "react";
import { testSchema1 } from "../../schemas/testSchema1.js";
import { JsonSchemaStandard, UISchemaElementType } from "../../types/index.js";
import { JsonFormData } from "../../types/JsonFormData.js";
import { FormEdit } from "./FormEdit.js";
import { SchemaEdit } from "./SchemaEdit.js";
import { UischemaEdit } from "./UischemaEdit.js";

export const DesignerEdit = ({
  schema = useOptionalState<JsonSchemaStandard>(testSchema1.jsonSchema),
  uischemas = useOptionalState<UISchemaElementType[]>(
    testSchema1.uiSchemas ?? [],
  ),
  data: [data, setData] = useOptionalState<JsonFormData>({}),
  editMode: [editMode, setEditMode] = useState<
    "preview" | "uischema" | "schema"
  >("preview"),
}) => (
  <>
    <View
      style={{
        gap: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Button
        onPress={() => setEditMode("preview")}
        className={editMode === "preview" ? "selected" : ""}
      >
        Preview
      </Button>
      <Button
        onPress={() => setEditMode("uischema")}
        className={editMode === "uischema" ? "selected" : ""}
      >
        Form
      </Button>
      <Button
        onPress={() => setEditMode("schema")}
        className={editMode === "schema" ? "selected" : ""}
      >
        Data
      </Button>
    </View>
    {editMode === "schema" ? (
      <SchemaEdit schema={schema} />
    ) : editMode === "uischema" ? (
      <UischemaEdit schema={schema} uischemas={uischemas} />
    ) : (
      <FormEdit
        schema={schema[0]}
        uischemas={uischemas[0]}
        data={[data, setData]}
      />
    )}
  </>
);
