// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";
import React, { useState } from "react";
import {
  editingSchema,
  jsonschemaUischema,
} from "../../schemas/jsonschemaSchema.js";
import {
  defaultJsonSchemaObjectWithPropertyArray,
  JsonSchemaObjectWithPropertyArray,
} from "../../types/index.js";

export const JsonSchemaEdit = ({
  jsonschema: [
    jsonschema,
    setSchema,
  ] = useState<JsonSchemaObjectWithPropertyArray>(
    defaultJsonSchemaObjectWithPropertyArray
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
