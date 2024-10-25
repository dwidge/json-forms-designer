// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { JsonSchemaStandard, UISchemaElementType } from "../types/index.js";

export const testSchema1: {
  jsonSchema: JsonSchemaStandard;
  uiSchema: UISchemaElementType;
} = {
  jsonSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
      },
      done: {
        type: "boolean",
      },
      due_date: {
        type: "string",
        format: "date",
      },
      recurrence: {
        type: "string",
        enum: ["Never", "Daily", "Weekly", "Monthly"],
      },
    },
    required: ["name", "due_date"],
  },
  uiSchema: {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        label: false,
        scope: "#/properties/done",
      },
      {
        type: "Control",
        scope: "#/properties/name",
      },
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/due_date",
          },
          {
            type: "Control",
            scope: "#/properties/recurrence",
          },
        ],
      },
    ],
  },
};
