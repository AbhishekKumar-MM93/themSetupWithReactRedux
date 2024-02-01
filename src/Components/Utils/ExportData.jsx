import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";

function ExportData({ apiData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const selctedRow = apiData.map((item) => {
    return {
      name: item.name,
      email: item.email,
      phoneNumber: item.phoneNumber,
    };
  });

  const exportToCSV = (selctedRow, fileName) => {
    const ws = XLSX.utils.json_to_sheet(selctedRow);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <div>
      <button
        className="dt-button buttons-collection btn btn-outline-secondary dropdown-toggle me-2"
        tabIndex="0"
        aria-controls="DataTables_Table_0"
        type="button"
        aria-haspopup="true"
        onClick={(e) => exportToCSV(selctedRow, fileName)}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-share font-small-4 me-50"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Data Export
        </span>
      </button>
    </div>
  );
}

export default ExportData;
