// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Button, View } from "@dwidge/json-forms-paper";
import React, { useState } from "react";
import { testSchema1 } from "../../schemas/testSchema1.js";
import { JsonSchemaStandard, UISchemaElementType } from "../../types/index.js";
import { JsonFormData } from "../../types/JsonFormData.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { SchemaEdit } from "./SchemaEdit.js";
import { FormEdit } from "./FormEdit.js";
import { UischemaEdit } from "./UischemaEdit.js";

export const DesignerEdit = ({
  schema = useStateWithOptionalSetter<JsonSchemaStandard>(
    testSchema1.jsonSchema,
  ),
  uischema = useStateWithOptionalSetter<UISchemaElementType>(
    () => testSchema1.uiSchema,
  ),
  data: [data, setData] = useStateWithOptionalSetter<JsonFormData>({}),
  editMode: [editMode, setEditMode] = useState<
    "preview" | "uischema" | "schema"
  >("preview"),
}) => (
  <>
    <View
      style={{ gap: 10, flexDirection: "row", justifyContent: "space-between" }}
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
        Uischema
      </Button>
      <Button
        onPress={() => setEditMode("schema")}
        className={editMode === "schema" ? "selected" : ""}
      >
        Schema
      </Button>
    </View>
    {editMode === "schema" ? (
      <SchemaEdit schema={schema} />
    ) : editMode === "uischema" ? (
      <UischemaEdit schema={schema} uischema={uischema} />
    ) : (
      <FormEdit
        schema={schema[0]}
        uischema={uischema[0]}
        data={[data, setData]}
      />
    )}
  </>
);
