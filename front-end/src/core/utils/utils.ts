import { saveAs } from "file-saver";

export const saveAsExcelFile = (buffer: any, fileName: string) => {
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";
  const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
};
