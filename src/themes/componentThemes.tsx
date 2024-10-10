// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { WithClassNameProps } from "@dwidge/class-name-rnw";
import { createTheme, CreateThemeOptions } from "@rneui/themed";
import { merge } from "lodash";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { darkMaterialTheme, lightMaterialTheme } from "./materialThemes.js";

export const mergeThemes = (
  themes: CreateThemeOptions[]
): CreateThemeOptions | undefined =>
  themes.reduce((acc, theme) => merge(acc, theme), themes[0]);

declare module "@rneui/themed" {
  export interface ComponentTheme {
    StyledButton: Partial<WithClassNameProps<TextStyle>>;
    StyledText: Partial<WithClassNameProps<TextStyle>>;
    StyledView: Partial<WithClassNameProps<ViewStyle>>;
  }
}
export const lightComponentTheme = createTheme({
  components: {
    StyledButton: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        selected: {
          color: lightMaterialTheme.colors?.background,
          backgroundColor: lightMaterialTheme.colors?.primary,
        },
      }),
    },
    StyledText: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        "horizontal-layout-item": { flex: 1 },
        error: {
          color: lightMaterialTheme?.colors?.error,
        },
        "category-label": {
          padding: 10,
        },
        selected: {
          color: lightMaterialTheme.colors?.background,
        },
      }),
      style: {
        fontSize: 16,
      },
    },
    StyledView: {
      stylesheet: StyleSheet.create<Record<string, ViewStyle>>({
        "pdf control": {
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "red",
          color: "blue",
        },
        "array-container": {
          flex: 1,
          gap: 10,
        },
        "vertical-layout": {
          flexDirection: "column",
          gap: 10,
        },
        "horizontal-layout": {
          flexDirection: "row",
          gap: 10,
        },
        "group-layout": {
          flexDirection: "column",
          gap: 10,
          padding: 10,
          backgroundColor: "#99999933",
          overflow: "hidden",
          borderRadius: 10,
        },
        "horizontal-layout-item": { flex: 1 },
        "category-list category-subcategories": {
          flexDirection: "column",
        },
        categorization: { flexDirection: "column", gap: 10 },
        "categorization-master": { flexDirection: "row" },
        "categorization-detail": {
          gap: 10,
        },
        "category-subcategories": {
          flexDirection: "row",
        },
        "category-label": {
          borderRadius: 10,
        },
        "category-label selected": {
          color: lightMaterialTheme.colors?.inversePrimary,
          backgroundColor: lightMaterialTheme.colors?.primary,
        },
      }),
    },
  },
});

export const darkComponentTheme = createTheme({
  ...lightComponentTheme,
  mode: "dark",
  components: {
    ...lightComponentTheme.components,
    StyledButton: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        selected: {
          color: darkMaterialTheme.colors?.background,
          backgroundColor: darkMaterialTheme.colors?.primary,
        },
      }),
    },
    StyledText: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        "horizontal-layout-item": { flex: 1 },
        error: {
          color: darkMaterialTheme?.colors?.error,
        },
        "category-label": {
          padding: 10,
        },
        selected: {
          color: darkMaterialTheme.colors?.background,
        },
      }),
      style: {
        color: "white",
        fontSize: 16,
      },
    },
    StyledView: {
      stylesheet: StyleSheet.create<Record<string, ViewStyle>>({
        "category-label selected": {
          color: darkMaterialTheme.colors?.inversePrimary,
          backgroundColor: darkMaterialTheme.colors?.primary,
        },
      }),
    },
  },
});

export const pdfComponentTheme = createTheme({
  components: {
    StyledText: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        error: {
          color: lightMaterialTheme?.colors?.error,
        },
        checkbox: {
          fontSize: 12,
        },
        control: {
          fontSize: 12,
        },
        "category label": {
          fontSize: 14,
          borderBottomWidth: 2,
          borderColor: "red",
        },
        debug1: {},
      }),
      style: {},
    },
    StyledView: {
      stylesheet: StyleSheet.create<Record<string, ViewStyle>>({
        control: {
          flexDirection: "row",
          justifyContent: "space-between",
        },
        "group-layout": {
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#999",
          overflow: "hidden",
          borderRadius: 10,
        },
        "vertical-layout": {
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#999",
          overflow: "hidden",
          borderRadius: 10,
        },
        "horizontal-layout": {
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#999",
          overflow: "hidden",
          borderRadius: 10,
        },
        categorization: {
          gap: 10,
        },
        label: {
          backgroundColor: "#99999933",
        },
        "category item": {
          gap: 10,
        },
        "table layout": {
          flexDirection: "column",
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#999",
          overflow: "hidden",
          borderRadius: 10,
        },
        "table-array control": {
          flexDirection: "column",
        },
        debug1: { fontSize: 8, color: "white", backgroundColor: "black" },
      }),
    },
  },
});
