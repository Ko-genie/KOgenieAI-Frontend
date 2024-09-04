import { IRootState } from "@/store";
import React from "react";
import dynamic from "next/dynamic";

import { useSelector } from "react-redux";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const NewUserCountByMonth = ({ data, name }: any) => {
  const isDark =
    useSelector((state: IRootState) => state.themeConfig.theme) === "dark"
      ? true
      : false;
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const uniqueVisitorSeries: any = {
    series: [
      {
        name: name,
        data: Object.values(data),
      },
    ],
    options: {
      chart: {
        height: 360,
        type: "bar",
        fontFamily: "Nunito, sans-serif",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#5c1ac3", "#ffbb44"],
      dropShadow: {
        enabled: true,
        blur: 3,
        color: "#515365",
        opacity: 0.4,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 8,
          borderRadiusApplication: "end",
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: isDark ? "#191e3a" : "#e0e6ed",
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: true,
          color: isDark ? "#3b3f5c" : "#e0e6ed",
        },
      },
      yaxis: {
        tickAmount: 6,
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -10 : 0,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: isDark ? "dark" : "light",
          type: "vertical",
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
    },
  };
  return (
    <ReactApexChart
      options={uniqueVisitorSeries.options}
      series={uniqueVisitorSeries.series}
      type="bar"
      height={360}
      width={"100%"}
    />
  );
};

export default NewUserCountByMonth;
