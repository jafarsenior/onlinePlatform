// src/components/charts/DashboardCharts.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ----- MOCK DATA -----
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4200 },
  { month: "May", sales: 6100 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 6800 },
  { month: "Aug", sales: 7200 },
  { month: "Sep", sales: 8100 },
  { month: "Oct", sales: 7600 },
  { month: "Nov", sales: 9000 },
  { month: "Dec", sales: 10200 },
];

const usersData = [
  { day: "Mon", users: 1200 },
  { day: "Tue", users: 2100 },
  { day: "Wed", users: 800 },
  { day: "Thu", users: 1600 },
  { day: "Fri", users: 2400 },
  { day: "Sat", users: 1900 },
  { day: "Sun", users: 900 },
];

const referralsData = [
  { name: "Organic", value: 400 },
  { name: "Referral", value: 300 },
  { name: "Social", value: 200 },
  { name: "Ads", value: 100 },
];

const COLORS = ["#C5A46D", "#8B6F3D", "#D8BE86", "#6F5A2B"];

// ----- CARD WRAPPER -----
const Card = ({ title, subtitle, children, darkMode }) => {
  const bgColor = darkMode
    ? "bg-[#1E1E1E] border-[#C5A46D]/10"
    : "bg-white border-gray-200";
  const textColor = darkMode ? "text-[#C5A46D]" : "text-gray-800";

  return (
    <div className={`border rounded-2xl p-4 shadow-sm ${bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`${textColor} font-semibold`}>{title}</h3>
          {subtitle && (
            <p className={`${textColor} opacity-70 text-sm`}>{subtitle}</p>
          )}
        </div>
      </div>
      <div style={{ height: 220 }}>{children}</div>
    </div>
  );
};

// ----- MAIN DASHBOARD -----
export default function DashboardCharts() {
  const { darkMode } = useContext(ThemeContext);

  const axisColor = darkMode ? "#C5A46D" : "#444";
  const tooltipBg = darkMode ? "#2A2A2A" : "#f5f5f5";
  const tooltipText = darkMode ? "#C5A46D" : "#333";
  const gridStroke = darkMode ? "#ffffff10" : "#00000010";
  const barColor = darkMode ? "#C5A46D" : "#8B6F3D";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-9">
      {/* --- Area: Sales --- */}
      <Card
        title="Sales overview"
        subtitle="Monthly sales (mock data)"
        darkMode={darkMode}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#C5A46D" stopOpacity={0.26} />
                <stop offset="100%" stopColor="#C5A46D" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={gridStroke} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
            />
            <YAxis
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
            />
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: "none",
                color: tooltipText,
              }}
              itemStyle={{ color: tooltipText }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#C5A46D"
              fill="url(#goldGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* --- Bar: Active Users --- */}
      <Card title="Active users" subtitle="Users by day" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={usersData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid stroke={gridStroke} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
            />
            <YAxis
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
            />
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: "none",
                color: tooltipText,
              }}
              itemStyle={{ color: tooltipText }}
            />
            <Bar dataKey="users" radius={[6, 6, 0, 0]} fill={barColor} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* --- Pie: Referrals --- */}
      <Card
        title="Referral sources"
        subtitle="Where users come from"
        darkMode={darkMode}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: "none",
                color: tooltipText,
              }}
              itemStyle={{ color: tooltipText }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ color: axisColor, fontSize: 12 }}
            />
            <Pie
              data={referralsData}
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              cx="50%"
              cy="40%"
            >
              {referralsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
