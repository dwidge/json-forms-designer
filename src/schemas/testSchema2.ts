// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { UISchemaElement } from "@jsonforms/core";
import { JSONSchemaType } from "ajv";
import { JsonSchemaStandard, UISchemaElementType } from "../types/index.js";

export interface TestSchema {
  title: string;
  active: boolean;
  count: number;
  phone: string;
  items: Item[];
  details: Details;
}

export interface Item {
  name: string;
  uri: string;
}

export interface Details {
  description: string;
  level: number;
}

export const testSchema2: {
  jsonSchema: JsonSchemaStandard;
  uiSchema: UISchemaElement;
} = {
  jsonSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      active: { type: "boolean" },
      count: { type: "integer" },
      phone: { type: "string", pattern: "^[0-9]{10,15}$" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            uri: { type: "string", format: "uri" },
          },
          required: ["name", "uri"],
        },
      },
      details: {
        type: "object",
        properties: {
          description: { type: "string" },
          level: { type: "integer" },
        },
        required: ["description", "level"],
      },
    },
    required: ["title", "active", "count", "phone", "items", "details"],
  } satisfies JSONSchemaType<TestSchema>,
  uiSchema: {
    type: "Categorization",
    elements: [
      {
        type: "Category",
        label: "Main Info",
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Title",
                scope: "#/properties/title",
              },
              {
                type: "Control",
                label: "Active",
                scope: "#/properties/active",
              },
              {
                type: "Control",
                label: "Count",
                scope: "#/properties/count",
              },
              {
                type: "Group",
                label: "Summary of Assessment",
                elements: [
                  {
                    type: "HorizontalLayout",
                    elements: [
                      {
                        type: "Label",
                        text: "Actives",
                      },
                      {
                        type: "Control",
                        label: "Active",
                        scope: "#/properties/active",
                      },
                      {
                        type: "Control",
                        label: "Count",
                        scope: "#/properties/count",
                      },
                    ],
                  },
                  {
                    type: "VerticalLayout",
                    elements: [
                      {
                        type: "Control",
                        label: "Active",
                        scope: "#/properties/active",
                      },
                      {
                        type: "Control",
                        label: "Count",
                        scope: "#/properties/count",
                      },
                      {
                        type: "Label",
                        text: "More Actives",
                      },
                      {
                        type: "Control",
                        label: "Phone",
                        scope: "#/properties/phone",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Category",
        label: "Items List",
        elements: [
          {
            type: "Control",
            label: "Items",
            scope: "#/properties/items",
            options: {
              detail: {
                type: "VerticalLayout",
                elements: [
                  {
                    type: "Control",
                    scope: "#/properties/name",
                    options: {
                      // multi: true,
                    },
                  },
                  {
                    type: "Control",
                    scope: "#/properties/uri",
                    label: "File",
                  },
                ],
              },
            },
          },
        ],
      },
      {
        type: "Category",
        label: "Details",
        elements: [
          {
            type: "Control",
            label: "Description",
            scope: "#/properties/details/properties/description",
          },
          {
            type: "Control",
            label: "Level",
            scope: "#/properties/details/properties/level",
          },
        ],
      },
    ],
  } satisfies UISchemaElementType as UISchemaElement,
};
