import { saveAs } from "file-saver";
import * as xlsx from "xlsx";

export const saveAsExcelFile = (buffer: any, fileName: string) => {
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";
  const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
};


export const exportExcel = (data: any[], fileName: string = 'export') => {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer: any = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  saveAsExcelFile(excelBuffer, fileName);
}
