// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

// Define a Zod type for RuleEffect enum
const RuleEffect = z.enum(["HIDE", "SHOW", "ENABLE", "DISABLE"]);

// Scopable schema
const Scopable = z.object({
  scope: z.string().optional(),
});

// Scoped schema extends Scopable with a mandatory scope
const Scoped = Scopable.extend({
  scope: z.string(),
});

// Labelable schema
const Labelable = z.object({
  label: z.union([z.string(), z.any()]).optional(),
});

// Internationalizable schema
const Internationalizable = z.object({
  i18n: z.string().optional(),
});

// Rule schema
const Rule = z.object({
  effect: RuleEffect,
  condition: z.lazy(() => Condition),
});

// ConditionBase schema
const ConditionBase = z.object({
  type: z.string().optional(),
});

// LeafCondition schema that extends ConditionBase and Scoped
const LeafCondition = ConditionBase.merge(Scoped).extend({
  type: z.literal("LEAF"),
  expectedValue: z.any(),
});

// SchemaBasedCondition schema that extends ConditionBase and Scoped
const SchemaBasedCondition = ConditionBase.merge(Scoped).extend({
  schema: z.any(), // Replace with appropriate JsonSchema when available
  failWhenUndefined: z.boolean().optional(),
});

// ComposableCondition schema that extends ConditionBase
const ComposableCondition = ConditionBase.extend({
  conditions: z.array(z.lazy(() => Condition)),
});

// OrCondition schema that extends ComposableCondition
const OrCondition = ComposableCondition.extend({
  type: z.literal("OR"),
});

// AndCondition schema that extends ComposableCondition
const AndCondition = ComposableCondition.extend({
  type: z.literal("AND"),
});

// Create the Condition union type that includes all subtypes
const Condition = z.union([
  LeafCondition,
  SchemaBasedCondition,
  OrCondition,
  AndCondition,
  ConditionBase,
]);

// Base UISchemaElement schema (will be extended later to handle all subtypes)
const UISchemaElementBase = z.object({
  type: z.string(),
  rule: Rule.optional(),
  options: z.record(z.any()).optional(),
});

// Layout schema that extends UISchemaElementBase
const LayoutBase = UISchemaElementBase.extend({
  elements: z.array(z.lazy(() => UISchemaElement)), // Recursive reference
});

// VerticalLayout schema
const VerticalLayout = LayoutBase.extend({
  type: z.literal("VerticalLayout"),
});

// HorizontalLayout schema
const HorizontalLayout = LayoutBase.extend({
  type: z.literal("HorizontalLayout"),
});

// GroupLayout schema that extends LayoutBase, Labelable, and Internationalizable
const GroupLayout = LayoutBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Group"),
  });

// LabelDescription schema
const LabelDescription = z.object({
  text: z.string().optional(),
  show: z.boolean().optional(),
});

// LabelElement schema that extends UISchemaElementBase and Internationalizable
const LabelElement = UISchemaElementBase.merge(Internationalizable).extend({
  type: z.literal("Label"),
  text: z.string(),
});

// ControlElement schema that extends UISchemaElementBase, Scoped, Labelable, and Internationalizable
const ControlElement = UISchemaElementBase.merge(Scoped)
  .merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Control"),
  });

// Category schema that extends LayoutBase, Labeled, and Internationalizable
const Category = LayoutBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Category"),
  });

// Categorization schema that extends UISchemaElementBase, Labeled, and Internationalizable
const Categorization = UISchemaElementBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Categorization"),
    elements: z.array(
      z.union([z.lazy(() => Category), z.lazy(() => Categorization)]),
    ),
  });

// Create the Layout union type that includes all subtypes
const Layout = z.union([
  VerticalLayout,
  HorizontalLayout,
  GroupLayout,
  LayoutBase,
]);

// Create the UISchemaElement union to include all subtypes
const UISchemaElement = z.union([
  VerticalLayout,
  HorizontalLayout,
  GroupLayout,
  LabelElement,
  ControlElement,
  Category,
  Categorization,
  LeafCondition,
  SchemaBasedCondition,
  OrCondition,
  AndCondition,
  UISchemaElementBase, // Base type should be included as fallback
]);

// // Export the main UISchemaElement schema and its inferred type
export const UISchemaElementType = UISchemaElement;
export type UISchemaElementType = z.infer<typeof UISchemaElement>;
export const defaultUISchemaElementType: UISchemaElementType = {
  type: "VerticalLayout",
};
