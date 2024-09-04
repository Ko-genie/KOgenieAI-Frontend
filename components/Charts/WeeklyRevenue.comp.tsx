import { IRootState } from "@/store";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { useSelector } from "react-redux";
const WeeklyRevenue = ({ value }: any) => {
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  // Extract labels and series data from the data object
  const labels = Object.keys(value);
  const series = Object.values(value);
  const revenueChart: any = {
    series: [
      {
        name: "Income",
        data: series, // Use the series data here
      },
    ],
    options: {
      chart: {
        height: 325,
        type: "area",
        fontFamily: "Nunito, sans-serif",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        lineCap: "square",
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ["#2196F3", "#E7515A"] : ["#1B55E2", "#E7515A"],

      labels: labels,
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return value / 1000 + "K";
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? "#191E3A" : "#E0E6ED",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };
  return (
    <ReactApexChart
      series={revenueChart.series}
      options={revenueChart.options}
      type="area"
      height={325}
      width={"100%"}
    />
  );
};

export default WeeklyRevenue;
