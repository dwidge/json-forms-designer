// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Button, View } from "@dwidge/json-forms-paper";
import React, { useState } from "react";
import { testSchema1 } from "../../schemas/testSchema1.js";
import { JsonSchemaObject, UISchemaElementType } from "../../types/index.js";
import { JsonFormData } from "../../types/JsonFormData.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { JsonFormsData } from "./JsonFormsEdit.js";
import { JsonFormsLayout } from "./JsonFormsLayout.js";
import { JsonFormsView } from "./JsonFormsView.js";

export const JsonFormsDesigner = ({
  schema = useStateWithOptionalSetter<JsonSchemaObject>(testSchema1.jsonSchema),
  uischema = useStateWithOptionalSetter<UISchemaElementType>(
    () => testSchema1.uiSchema
  ),
  data: [data, setData] = useStateWithOptionalSetter<JsonFormData>({}),
  editMode: [editMode, setEditMode] = useState<"view" | "data" | "layout">(
    "view"
  ),
}) => (
  <>
    <View
      style={{ gap: 10, flexDirection: "row", justifyContent: "space-between" }}
    >
      <Button
        onPress={() => setEditMode("view")}
        className={editMode === "view" ? "selected" : ""}
      >
        Preview
      </Button>
      <Button
        onPress={() => setEditMode("layout")}
        className={editMode === "layout" ? "selected" : ""}
      >
        Form Layout
      </Button>
      <Button
        onPress={() => setEditMode("data")}
        className={editMode === "data" ? "selected" : ""}
      >
        Data Structure
      </Button>
    </View>
    {editMode === "data" ? (
      <JsonFormsData schema={schema} />
    ) : editMode === "layout" ? (
      <JsonFormsLayout schema={schema} uischema={uischema} />
    ) : (
      <JsonFormsView
        schema={schema[0]}
        uischema={uischema[0]}
        data={[data, setData]}
      />
    )}
  </>
);
