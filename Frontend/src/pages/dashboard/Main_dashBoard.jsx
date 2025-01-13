import { LineChart, PieChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ["red", "blue", "green"];
const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 600,
  height: 350,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value}mm`;

export default function Main_dashBoard() {
  return (
    <>
      <div className="container-fluid scrollable-container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center">Sales Revenue</h4>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-center">Projects Overview</h4>
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "seoul", valueFormatter }]}
              layout="horizontal"
              {...chartSetting}
            />
          </div>
          <div className="col-md-6 ">
            <h4 className="text-center">Total Cost/year</h4>
            <div className="d-flex">
              <PieChart
                series={[
                  { data: [{ value: 10 }, { value: 15 }, { value: 20 }] },
                ]}
                {...pieParams}
              />
              <PieChart
                colors={palette}
                series={[
                  { data: [{ value: 10 }, { value: 15 }, { value: 20 }] },
                ]}
                {...pieParams}
              />
              <PieChart
                series={[
                  {
                    data: [
                      { value: 10, color: "orange" },
                      { value: 15 },
                      { value: 20 },
                    ],
                  },
                ]}
                {...pieParams}
              />
            </div>
            <h5 className="mt-3 text-end">Buisness Overview Fy: 2023-24</h5>
            <h5 className="text-end">Recent Transactions: 3800 </h5>
            <h5 className="text-end"> OverAll Earnings: 45 lacs </h5>
          </div>
          <div className="col-md-6">
            <h4 className="text-center">Employees History</h4>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={600}
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
}
