import * as React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { colors } from "@mui/material";

const dataset = [
  {
    Members: 21,
    month: "Jan",
  },
  {
    Members: 28,
    month: "Feb",
  },
  {
    Members: 41,
    month: "Mar",
  },
  {
    Members: 15,
    month: "Apr",
  },
  {
    Members: 35,
    month: "May",
  },
  {
    Members: 40,
    month: "June",
  },
  {
    Members: 25,
    month: "July",
  },
  {
    Members: 58,
    month: "Aug",
  },
  {
    Members: 9,
    month: "Sept",
  },
  {
    Members: 21,
    month: "Oct",
  },
  {
    Members: 48,
    month: "Nov",
  },
  {
    Members: 25,
    month: "Dec",
  },
];

const chartSetting = {
  yAxis: [
    {
      label: "Joined Members in Last Year",
    },
  ],
  series: [{ dataKey: "Members", label: "Joined Members " }],
  height: 300,
  colors: ["blue"],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function FirstChats() {
  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
