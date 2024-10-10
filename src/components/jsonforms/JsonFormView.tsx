// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { paperCells, paperRenderers } from "@dwidge/json-forms-paper";
import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  defaultJsonSchemaObject,
  defaultUISchemaElementType,
} from "../../types/index.js";
import { useStateWithOptionalSetter } from "../../utils/useStateWithOptionalSetter.js";

export const JsonFormView = ({
  schema = defaultJsonSchemaObject,
  uischema = defaultUISchemaElementType,
  data: [data, setData] = useStateWithOptionalSetter({}),
}) => (
  <JsonForms
    renderers={paperRenderers}
    cells={paperCells}
    schema={schema}
    uischema={uischema}
    data={data}
    onChange={setData && (({ data }) => setData(data))}
  />
);
