// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import { JsonForms } from "@jsonforms/react";
import {
  uischemaSchema,
  uischemaUischema,
} from "../../schemas/uischemaSchema.js";
import {
  defaultUISchemaElementType,
  JsonSchemaObject,
  UISchemaElementType,
} from "../../types/index.js";
import { buildRefs } from "../../utils/buildRefs.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";
import { deepMerge } from "../../utils/deepMerge.js";

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

export const UiSchemaEdit = ({
  jsonschema: [jsonschema] = useStateWithOptionalSetter<JsonSchemaObject>({
    type: "object",
  }),
  uischema: [
    uischema,
    setUischema,
  ] = useStateWithOptionalSetter<UISchemaElementType>(
    defaultUISchemaElementType
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
