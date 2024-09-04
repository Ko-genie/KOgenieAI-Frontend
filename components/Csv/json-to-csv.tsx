import React, { useState } from "react";
import "react-data-grid/lib/styles.css";
import ReactDataGrid from "react-data-grid";
import { convertToCSV } from "@/utils/functions";
import { FaDownload } from "react-icons/fa";

const JsonToCsvComp = ({ jsonData, headerText = "JSON Data Viewer" }: any) => {
  const columns = Object.keys(jsonData[0]).map((key) => ({
    key: key,
    name: key,
    // width: 150,
  }));

  const csvData = convertToCSV(jsonData);

  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className=" rounded-lg ">
      <div className="text-gray flex justify-between rounded-t-lg p-4">
        <h2 className="text-2xl font-bold">{headerText}</h2>
        <button
          className="ml-5 flex cursor-pointer rounded-lg bg-primary p-2 text-white hover:bg-primary"
          onClick={downloadCSV}
        >
          <FaDownload className="mr-2" />
          Download CSV
        </button>
      </div>
      <div className="rounded-b-lg bg-white p-4  dark:bg-black">
        <ReactDataGrid columns={columns} rows={jsonData} />
      </div>
    </div>
  );
};

export default JsonToCsvComp;
