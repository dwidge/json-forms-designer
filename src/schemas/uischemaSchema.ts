// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  RuleEffect,
  SchemaBasedCondition,
  UISchemaElement,
} from "@jsonforms/core";
import { JsonSchemaObject } from "../types/JSONSchema.js";

const uiproperty = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: [
        "Categorization",
        "Category",
        "Group",
        "Control",
        "Label",
        "VerticalLayout",
        "HorizontalLayout",
      ],
      title: "Type",
    },
    label: {
      type: "string",
      title: "Label",
      nullable: true,
    },
    scope: {
      type: "string",
      title: "Scope",
      nullable: true,
    },
    elements: {
      type: "array",
      title: "Elements",
      items: {
        type: "object",
        $ref: "#/definitions/property",
        required: ["type"],
      },
      nullable: true,
    },
    options: {
      type: "object",
      title: "Options",
      nullable: true,
      properties: {
        multi: {
          type: "boolean",
          title: "Multiline",
          nullable: true,
        },
        detail: {
          type: "array",
          title: "Detail",
          items: {
            type: "object",
            $ref: "#/definitions/property",
            required: ["type"],
          },
          nullable: true,
        },
      },
      required: [],
    },
  },
  required: ["type"],
} satisfies JsonSchemaObject;

export const uischemaSchema = {
  ...uiproperty,
  definitions: {
    property: uiproperty,
  },
} satisfies JsonSchemaObject;

export const uischemaUischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/type",
    },
    {
      type: "Control",
      scope: "#/properties/label",
      rule: {
        effect: RuleEffect.SHOW,
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: ["Category", "Group", "Control", "Label"],
          },
        } satisfies SchemaBasedCondition,
      },
    },
    {
      type: "Control",
      scope: "#/properties/scope",
      rule: {
        effect: RuleEffect.SHOW,
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: ["Control"],
          },
        } satisfies SchemaBasedCondition,
      },
    },
    {
      type: "Control",
      scope: "#/properties/elements",
      rule: {
        effect: RuleEffect.SHOW,
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: [
              "Categorization",
              "Category",
              "Group",
              "VerticalLayout",
              "HorizontalLayout",
            ],
          },
        } satisfies SchemaBasedCondition,
      },
    },
    {
      type: "Control",
      scope: "#/properties/options/properties/multi",
      rule: {
        effect: RuleEffect.SHOW,
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: ["Control"],
          },
        } satisfies SchemaBasedCondition,
      },
    },
    {
      type: "Control",
      scope: "#/properties/options/properties/detail",
      rule: {
        effect: RuleEffect.SHOW,
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: ["Control"],
          },
        } satisfies SchemaBasedCondition,
      },
    },
  ],
} as UISchemaElement;
