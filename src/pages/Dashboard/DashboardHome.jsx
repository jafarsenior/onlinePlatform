// src/components/charts/DashboardCharts.jsx
import React from "react";
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

/**
 * Dark + Gold theme:
 * bg: #1E1E1E
 * gold: #C5A46D
 * accent darker gold: #8B6F3D
 * muted: rgba(197,164,109,0.25)
 */

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

// ----- SMALL CARD WRAPPER -----
const Card = ({ title, subtitle, children }) => (
  <div className="bg-[#1E1E1E] border border-[#C5A46D]/10 rounded-2xl p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-[#C5A46D] font-semibold">{title}</h3>
        {subtitle && <p className="text-[#C5A46D]/70 text-sm">{subtitle}</p>}
      </div>
    </div>
    <div style={{ height: 220 }}>{children}</div>
  </div>
);

// ----- CHARTS -----
export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Area: Sales */}
      <Card title="Sales overview" subtitle="Monthly sales (mock data)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#C5A46D" stopOpacity={0.26} />
                <stop offset="100%" stopColor="#C5A46D" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#C5A46D", fontSize: 12 }} />
            <YAxis tick={{ fill: "#C5A46D", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#2A2A2A", border: "none", color: "#C5A46D" }}
              itemStyle={{ color: "#C5A46D" }}
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

      {/* Bar: Active Users */}
      <Card title="Active users" subtitle="Users by day">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usersData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#C5A46D", fontSize: 12 }} />
            <YAxis tick={{ fill: "#C5A46D", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#2A2A2A", border: "none", color: "#C5A46D" }}
              itemStyle={{ color: "#C5A46D" }}
            />
            <Bar dataKey="users" radius={[6, 6, 0, 0]} fill="#C5A46D" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Donut: Referrals */}
      <Card title="Referral sources" subtitle="Where users come from">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ background: "#2A2A2A", border: "none", color: "#C5A46D" }}
              itemStyle={{ color: "#C5A46D" }}
            />
            <Legend verticalAlign="bottom" wrapperStyle={{ color: "#C5A46D" }} />
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
