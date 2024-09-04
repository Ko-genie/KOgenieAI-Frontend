import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React from "react";
import Dropdown from "@/components/Dropdown";
const tableData = [
  {
    id: 1,
    name: "AI Code Generator",
    description:
      "Create custom code in seconds! Leverage our state-of-the-art AI technology to quickly and easily generate code in any language.",
    date: "10/08/2020",
    sale: 120,
    status: "Complete",
    register: "5 min ago",
    progress: "40%",
    position: "Developer",
    office: "London",
  },
  {
    id: 2,
    name: "Shaun Park",
    description:
      "Create custom code in seconds! Leverage our state-of-the-art AI technology to quickly and easily generate code in any language.",
    date: "11/08/2020",
    sale: 400,
    status: "Pending",
    register: "11 min ago",
    progress: "23%",
    position: "Designer",
    office: "New York",
  },
  {
    id: 3,
    name: "Alma Clarke",
    description:
      "Create custom code in seconds! Leverage our state-of-the-art AI technology to quickly and easily generate code in any language.",
    date: "12/02/2020",
    sale: 310,
    status: "In Progress",
    register: "1 hour ago",
    progress: "80%",
    position: "Accountant",
    office: "Amazon",
  },
  {
    id: 4,
    name: "Vincent Carpenter",
    description:
      "Create custom code in seconds! Leverage our state-of-the-art AI technology to quickly and easily generate code in any language.",
    date: "13/08/2020",
    sale: 100,
    status: "Canceled",
    register: "1 day ago",
    progress: "60%",
    position: "Data Scientist",
    office: "Canada",
  },
];
export default function BuiltInTemplates() {
  return (
    <>
      <div className="table-responsive mb-5">
        <table>
          <thead>
            <tr>
              <th className="capitalize">Status</th>
              <th className="capitalize">Template Name</th>
              <th className="capitalize">Template Description</th>
              <th className="capitalize">Package</th>
              <th className="capitalize">Update At</th>
              <th className="capitalize">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => {
              return (
                <tr key={data.id}>
                  <td>
                    <div
                      className={`whitespace-nowrap ${
                        data.status === "completed"
                          ? "text-success"
                          : data.status === "Pending"
                          ? "text-secondary"
                          : data.status === "In Progress"
                          ? "text-info"
                          : data.status === "Canceled"
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      {data.status}
                    </div>
                  </td>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>
                    <div className="dropdown">
                      <Dropdown
                        placement={`bottom-end`}
                        btnClassName="btn btn-outline-primary dropdown-toggle"
                        button={
                          <>
                            Regular
                            <span>
                              <svg
                                className="inline-block h-4 w-4 ltr:ml-1 rtl:mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 9L12 15L5 9"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </>
                        }
                      >
                        <ul className="!min-w-[120px]">
                          <li>
                            <button type="button">Regular</button>
                          </li>
                          <li>
                            <button type="button">Premium</button>
                          </li>
                        </ul>
                      </Dropdown>
                    </div>
                  </td>
                  <td>{data.date}</td>
                  <td className="text-center">
                    <div className="dropdown">
                      <Dropdown
                        placement={`bottom-end`}
                        btnClassName="btn btn-danger dropdown-toggle !flex rounded-full"
                        button={
                          <>
                            
                            Passive
                          </>
                        }
                      >
                        <ul className="!min-w-[170px]">
                          <li>
                            <button type="button">Action</button>
                          </li>
                          <li>
                            <button type="button">Another action</button>
                          </li>
                          <li>
                            <button type="button">Something else here</button>
                          </li>
                          <li>
                            <button type="button">Separated link</button>
                          </li>
                        </ul>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
