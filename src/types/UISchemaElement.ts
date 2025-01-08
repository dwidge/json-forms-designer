// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

const RuleEffect = z.enum(["HIDE", "SHOW", "ENABLE", "DISABLE"]);
export type RuleEffectType = "HIDE" | "SHOW" | "ENABLE" | "DISABLE";

const Scopable = z.object({
  scope: z.string().optional(),
});
export type ScopableType = {
  scope?: string;
};

const Scoped = Scopable.extend({
  scope: z.string(),
});
export type ScopedType = {
  scope: string;
};

const Labelable = z.object({
  label: z.string().optional(),
});
export type LabelableType = {
  label?: string;
};

const Internationalizable = z.object({
  i18n: z.string().optional(),
});
export type InternationalizableType = {
  i18n?: string;
};

const ConditionBase = z.object({
  type: z.string().optional(),
});
export type ConditionBaseType = {
  type?: string;
};

const LeafCondition = ConditionBase.merge(Scoped).extend({
  type: z.literal("LEAF"),
  expectedValue: z.any(),
});
export type LeafConditionType = {
  type: "LEAF";
  expectedValue: any;
} & ScopedType;

const SchemaBasedCondition = ConditionBase.merge(Scoped).extend({
  schema: z.any(),
  failWhenUndefined: z.boolean().optional(),
});
export type SchemaBasedConditionType = {
  schema: any;
  failWhenUndefined?: boolean;
} & ScopedType;

const ComposableCondition = ConditionBase.extend({
  conditions: z.array(z.lazy(() => Condition)),
});
export type ComposableConditionType = {
  conditions: ConditionType[];
};

const OrCondition = ComposableCondition.extend({
  type: z.literal("OR"),
});
export type OrConditionType = {
  type: "OR";
} & ComposableConditionType;

const AndCondition = ComposableCondition.extend({
  type: z.literal("AND"),
});
export type AndConditionType = {
  type: "AND";
} & ComposableConditionType;

const Condition = z.union([
  LeafCondition,
  SchemaBasedCondition,
  OrCondition,
  AndCondition,
  ConditionBase,
]);
export type ConditionType =
  | LeafConditionType
  | SchemaBasedConditionType
  | OrConditionType
  | AndConditionType
  | ConditionBaseType;

const Rule = z.object({
  effect: RuleEffect,
  condition: Condition,
});
export type RuleType = {
  effect: RuleEffectType;
  condition: ConditionType;
};

const UISchemaElementBase = z.object({
  $id: z.ostring(),
  type: z.string(),
  rule: Rule.optional(),
  options: z.record(z.any()).optional(),
});
export type UISchemaElementBaseType = {
  $id?: string;
  type: string;
  rule?: RuleType;
  options?: Record<string, any>;
};

const LayoutBase = UISchemaElementBase.extend({
  elements: z.array(z.lazy(() => UISchemaElement)),
});
export type LayoutBaseType = {
  elements: UISchemaElementType[];
} & UISchemaElementBaseType;

const VerticalLayout = LayoutBase.extend({
  type: z.literal("VerticalLayout"),
});
export type VerticalLayoutType = {
  type: "VerticalLayout";
} & LayoutBaseType;

const HorizontalLayout = LayoutBase.extend({
  type: z.literal("HorizontalLayout"),
});
export type HorizontalLayoutType = {
  type: "HorizontalLayout";
} & LayoutBaseType;

const GroupLayout = LayoutBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Group"),
  });
export type GroupLayoutType = {
  type: "Group";
} & LayoutBaseType &
  LabelableType &
  InternationalizableType;

const LabelElement = UISchemaElementBase.merge(Internationalizable).extend({
  type: z.literal("Label"),
  text: z.string(),
});
export type LabelElementType = {
  type: "Label";
  text: string;
} & UISchemaElementBaseType &
  InternationalizableType;

const ControlElement = UISchemaElementBase.merge(Scoped)
  .merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Control"),
  });
export type ControlElementType = {
  type: "Control";
} & UISchemaElementBaseType &
  ScopedType &
  LabelableType &
  InternationalizableType;

const Category = LayoutBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Category"),
  });
export type CategoryType = {
  type: "Category";
} & LayoutBaseType &
  LabelableType &
  InternationalizableType;

const Categorization = UISchemaElementBase.merge(Labelable)
  .merge(Internationalizable)
  .extend({
    type: z.literal("Categorization"),
    elements: z.array(
      z.union([z.lazy(() => Category), z.lazy(() => Categorization)]),
    ),
  });
export type CategorizationType = {
  type: "Categorization";
  elements: (CategoryType | CategorizationType)[];
} & UISchemaElementBaseType &
  LabelableType &
  InternationalizableType;

const Layout = z.union([
  VerticalLayout,
  HorizontalLayout,
  GroupLayout,
  LayoutBase,
]);
export type LayoutType =
  | VerticalLayoutType
  | HorizontalLayoutType
  | GroupLayoutType
  | LayoutBaseType;

const UISchemaElement = z.discriminatedUnion("type", [
  VerticalLayout,
  HorizontalLayout,
  GroupLayout,
  LabelElement,
  ControlElement,
  Category,
  Categorization,
]);

export const UISchemaElementType = UISchemaElement;
export type UISchemaElementType =
  | VerticalLayoutType
  | HorizontalLayoutType
  | GroupLayoutType
  | LabelElementType
  | ControlElementType
  | CategoryType
  | CategorizationType;

export const defaultUISchemaElementType: UISchemaElementType = {
  type: "VerticalLayout",
  elements: [],
};
export const defaultUISchemas: UISchemaElementType[] = [
  {
    type: "VerticalLayout",
    elements: [],
  },
];

export const convertUiSchemaToString = (s: UISchemaElementType[]): string =>
  JSON.stringify(s, null, 2);
export const convertStringToUiSchema = (s: string): UISchemaElementType[] =>
  UISchemaElementType.array().parse(JSON.parse(s));
