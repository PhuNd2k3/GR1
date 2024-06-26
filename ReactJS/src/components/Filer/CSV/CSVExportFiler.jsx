import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

export function CSVExportFiler({ csvData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    ws.A1.v = "MSSV";
    ws.B1.v = "Họ và tên";
    ws.C1.v = "Ngày sinh";
    ws.D1.v = "Email";
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button variant="contained" onClick={(e) => exportToCSV(csvData, fileName)}>
      Export
    </Button>
  );
}
