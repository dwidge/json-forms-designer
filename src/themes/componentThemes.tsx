// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { WithClassNameProps } from "@dwidge/class-name-rnw";
import { createTheme, CreateThemeOptions } from "@rneui/themed";
import { StyleSheet, TextStyle, ViewStyle, View } from "react-native";
import { darkMaterialTheme, lightMaterialTheme } from "./materialThemes.js";
import * as Paper from "react-native-paper";
import merge from "ts-deepmerge";

export const mergeThemes = (
  themes: CreateThemeOptions[],
): CreateThemeOptions | undefined => merge(...themes);

declare module "@rneui/themed" {
  export interface ComponentTheme {
    StyledFormButton: Partial<
      React.ComponentProps<typeof Paper.Button> & WithClassNameProps<TextStyle>
    >;
    StyledFormView: Partial<
      React.ComponentProps<typeof View> & WithClassNameProps<ViewStyle>
    >;
    StyledFormText: Partial<
      React.ComponentProps<typeof Paper.Text> & WithClassNameProps<TextStyle>
    >;
    StyledFormInput: Partial<
      React.ComponentProps<typeof Paper.TextInput> &
        WithClassNameProps<TextStyle>
    >;
  }
}

const lightStyledViewStylesheet = StyleSheet.create<Record<string, ViewStyle>>({
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
    backgroundColor: "#99999922",
    overflow: "hidden",
    borderRadius: 10,
  },
  "horizontal-layout-item": { flex: 1 },
  "category-list category-subcategories": {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
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
    borderWidth: 1,
    maxWidth: "100%",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: lightMaterialTheme.colors?.inversePrimary,
  },
  "category-label selected": {
    color: lightMaterialTheme.colors.onPrimary,
    backgroundColor: lightMaterialTheme.colors.primary,
  },

  "table-array container": {
    width: "100%",
    gap: 5,
  },
  "table-array header row": {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: lightMaterialTheme.colors.primary,
  },
  "table-array data row": {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  "table-array header cell": {},
  "table-array cell": {
    flex: 1,
  },
  "table-array cell boolean": {
    maxWidth: 80,
    alignItems: "center",
  },
  "table-array cell actions": {
    maxWidth: 50,
    alignItems: "center",
  },
  "table-array data cell string": {
    flexDirection: "column",
    alignItems: "stretch",
  },
  "table-array row": { gap: 10 },

  "control-array item-controls": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -10,
  },
  "control-array item-controls add": {
    alignSelf: "flex-end",
    height: 0,
    zIndex: 2,
  },
  "control-array container": {
    flexDirection: "column",
    gap: 10,
  },
  "control-array items": {
    flexDirection: "column",
    gap: 5,
  },
  "control-array item": {
    flexDirection: "row",
  },
  "control-array item-render": {
    flex: 1,
    padding: 10,
    backgroundColor: "#99999922",
    overflow: "hidden",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  "label-error": { flexDirection: "row", gap: 10 },

  debug1: {
    borderColor: "#ff0",
    borderWidth: 1,
  },
  "debug-label": {
    left: 0,
    right: 0,
    padding: 2,
    color: "black",
    backgroundColor: "#ff09",
  },
});

const darkStyledViewStylesheet = merge(
  lightStyledViewStylesheet,
  StyleSheet.create<Record<string, ViewStyle>>({
    "category-label selected": {
      color: darkMaterialTheme.colors.onPrimary,
      backgroundColor: darkMaterialTheme.colors.primary,
    },
    "table-array header row": {
      borderBottomColor: darkMaterialTheme.colors.primary,
    },
  }),
);

const lightStyledTextStylesheet = StyleSheet.create<Record<string, TextStyle>>({
  "table-array header cell": {
    fontSize: 18,
    fontWeight: "500",
  },
  "table-array header cell boolean": {
    textAlign: "center",
  },
  "table-array header cell actions": {
    textAlign: "center",
  },
  "horizontal-layout-item": { flex: 1 },
  error: {
    color: lightMaterialTheme?.colors?.error,
  },
  "category-label": {
    margin: 10,
  },
  selected: {
    color: lightMaterialTheme.colors?.onPrimary,
  },

  debug1: {
    borderColor: "#ff0",
    borderWidth: 1,
  },
  "debug-label": {
    left: 0,
    right: 0,
    padding: 2,
    color: "black",
    backgroundColor: "#ff09",
  },
});

const darkStyledTextStylesheet = merge(
  lightStyledTextStylesheet,
  StyleSheet.create<Record<string, TextStyle>>({
    error: {
      color: darkMaterialTheme?.colors?.error,
    },
    selected: {
      color: darkMaterialTheme.colors?.onPrimary,
    },
  }),
);

export const lightComponentTheme = createTheme({
  components: {
    StyledFormButton: {
      stylesheet: StyleSheet.create<Record<string, TextStyle>>({
        selected: {
          color: lightMaterialTheme.colors?.onPrimary,
          backgroundColor: lightMaterialTheme.colors?.primary,
        },
      }),
      style: {
        color: lightMaterialTheme.colors?.background,
        margin: 0,
      },
    },
    StyledFormView: {
      stylesheet: lightStyledViewStylesheet,
    },
    StyledFormText: {
      stylesheet: lightStyledTextStylesheet,
      style: {
        flexShrink: 1,
        color: lightMaterialTheme.colors?.onBackground,
        fontSize: 16,
        pointerEvents: "none",
        userSelect: "none",
      },
    },
    StyledFormInput: {
      stylesheet: lightStyledTextStylesheet,
      contentStyle: {
        flex: 1,
        fontSize: 16,
      },
    },
  },
});

export const darkComponentTheme = merge(
  lightComponentTheme,
  createTheme({
    mode: "dark",
    components: {
      // ...lightComponentTheme.components,
      StyledFormButton: merge(
        lightComponentTheme.components?.StyledFormButton ?? {},
        {
          stylesheet: StyleSheet.create<Record<string, TextStyle>>({
            selected: {
              color: darkMaterialTheme.colors?.onPrimary,
              backgroundColor: darkMaterialTheme.colors?.primary,
            },
          }),
        },
      ),
      StyledFormText: {
        stylesheet: darkStyledTextStylesheet,
        style: { color: darkMaterialTheme.colors?.onBackground },
      },
      StyledFormView: {
        stylesheet: darkStyledViewStylesheet,
      },
    },
  }),
);

export const pdfComponentTheme = createTheme({
  components: {
    StyledFormText: {
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
    StyledFormView: {
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
