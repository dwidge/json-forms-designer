// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  UISchemaElement,
  VerticalLayout,
  HorizontalLayout,
  GroupLayout,
  LabelElement,
  ControlElement,
  Category,
  Categorization,
  Layout,
} from "@jsonforms/core";

export type AnyUISchemaElement =
  | UISchemaElement
  | ((
      | Layout
      | VerticalLayout
      | HorizontalLayout
      | GroupLayout
      | Category
      | Categorization
    ) & {
      elements: AnyUISchemaElement[];
    })
  | LabelElement
  | ControlElement;
