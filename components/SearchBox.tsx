import React from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ setSearch, search }: any) {
  return (
    <div className="group relative inline-block min-w-full flex-1 sm:min-w-[250px]">
      <input
        type="text"
        className="peer form-input pr-10"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
        <BsSearch />
      </div>
    </div>
  );
}
