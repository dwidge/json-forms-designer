// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// import { exportUri } from "@dwidge/components-expo";
// import { pdfCells, pdfRenderers } from "@dwidge/json-forms-pdf";
// import { JsonForms } from "@jsonforms/react";
// import { Document, Page, View, Text, pdf, StyleSheet } from "@react-pdf/renderer";
// import { Button, ThemeProvider } from "@rneui/themed";
// import React, { createContext, useContext, useState } from "react";

// import { AnyUISchemaElement } from "../types/AnyUISchemaElement.js";
// import { JsonFormData } from "../types/JsonFormData.js";
// import { pdfComponentTheme } from "../themes/componentThemes.js";
// import { convertJsonSchemaArrayToJsonSchemaStandard, JsonSchemaArray } from "../types/JsonSchemaForm.js";

// export const PdfThemeContext = createContext(pdfComponentTheme);

// export const JsonFormPdfExportButton = ({
//   schema,
//   uischema,
//   data,
//   theme = useContext(PdfThemeContext),
//   title = "Export PDF",
// }) => (
//   <Button onPress={() => generateAndSavePDF({ schema, uischema, data, theme })} title={title} />
// );

// export const generateAndSavePDF = async ({ schema, uischema, data, theme = pdfComponentTheme }) => {
//   const blob = await pdf(
//     <ThemeProvider theme={theme}>
//       <PdfJsonFormDocument schema={schema} uischema={uischema} data={data} />
//     </ThemeProvider>
//   ).toBlob();
//   const uri = await blobToDataURI(blob);
//   if (!uri) return;
//   await exportUri(uri, "form-data.pdf");
// };

// const blobToDataURI = (blob: Blob): Promise<string | undefined> =>
//   new Promise((res) => {
//     const reader = new FileReader();
//     reader.onloadend = function () {
//       res(reader.result?.toString());
//     };
//     reader.readAsDataURL(blob);
//   });

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 12,
//   },
//   header: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });

// const PdfJsonFormDocument: React.FC<{
//   schema: JsonSchemaArray[];
//   uischema: AnyUISchemaElement[];
//   data: JsonFormData;
// }> = ({ schema, uischema, data }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <Header />
//       <PdfJsonFormView
//         {...{
//           schema,
//           uischema,
//           data,
//         }}
//       />
//     </Page>
//   </Document>
// );

// const Header = () => (
//   <View fixed style={styles.header}>
//     <Text>Inspection</Text>
//     <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
//     <CompanyHeader />
//   </View>
// );

// const CompanyHeader = ({ company = "" }) => (
//   <View
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       gap: "5",
//     }}
//   >
//     <Text>{company}</Text>
//   </View>
// );

// const PdfJsonFormView = ({
//   schema = useState<JsonSchemaArray[]>([])[0],
//   uischema = useState<AnyUISchemaElement[]>([])[0],
//   data = {} as JsonFormData,
//   title = "Form",
// }) => (
//   <JsonForms
//     renderers={pdfRenderers}
//     cells={pdfCells}
//     schema={convertJsonSchemaArrayToJsonSchemaStandard({
//       type: "object",
//       properties: schema,
//     })}
//     uischema={{ label: title, type: "Group", elements: uischema } as AnyUISchemaElement}
//     data={data}
//   />
// );
