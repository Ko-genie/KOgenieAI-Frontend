import React from "react";

const DangerAlert = ({ msg }: { msg: string }) => {
  return (
    <div className="flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light my-2">
      <span className="ltr:pr-2 rtl:pl-2">{msg}</span>
    </div>
  );
};

export default DangerAlert;
