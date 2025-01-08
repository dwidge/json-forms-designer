// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  RuleEffect,
  SchemaBasedCondition,
  UISchemaElement,
} from "@jsonforms/core";
import { JsonSchemaStandard } from "../types";
import merge from "ts-deepmerge";

const uischemaItem = {
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
    text: {
      type: "string",
      title: "Text",
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
        ref: {
          type: "string",
          title: "Ref",
          nullable: true,
        },
        multi: {
          type: "boolean",
          title: "Multiline",
          nullable: true,
        },
        detail: {
          type: "object",
          $ref: "#/definitions/property",
          title: "Detail",
          nullable: true,
        },
      },
      required: [],
    },
  },
  required: ["type"],
  default: { type: "Label", text: "" },
} satisfies JsonSchemaStandard;

const editorUischemaItem = merge(uischemaItem, {
  properties: {
    options: {
      properties: {
        detail: {
          type: "array",
          title: "Detail",
          $ref: undefined,
          items: {
            type: "object",
            $ref: "#/definitions/property",
            required: ["type"],
          },
          maxItems: 1,
          nullable: true,
        },
      },
    },
  },
}) as JsonSchemaStandard;

export const layoutSchema = {
  type: "array",
  items: { $ref: "#/definitions/property" },
  definitions: {
    property: editorUischemaItem,
  },
} satisfies JsonSchemaStandard;

export const layoutUischema = {
  type: "Control",
  scope: "#",
  options: {
    summary: {
      type: "Control",
      scope: "#/properties/options/properties/ref",
    },
  },
};

export const layoutRegistryUischema = {
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
      options: { summary: { type: "Control", scope: "#/properties/label" } },
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
