import React, { useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const Health = () => {
  const { darkMode } = useContext(ThemeContext);

  const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", completed: false },
    { id: 2, name: "Morning Exercise", completed: true },
    { id: 3, name: "Meditation", completed: false },
  ]);

  const sleepData = [
    { day: "Mon", hours: 6 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 7 },
    { day: "Sat", hours: 8 },
    { day: "Sun", hours: 9 },
  ];

  const stepsData = [
    { day: "Mon", steps: 4500 },
    { day: "Tue", steps: 6200 },
    { day: "Wed", steps: 5300 },
    { day: "Thu", steps: 7200 },
    { day: "Fri", steps: 6800 },
    { day: "Sat", steps: 8000 },
    { day: "Sun", steps: 9000 },
  ];

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const bgMain = darkMode
    ? "from-[#1E1E1E] to-[#2A2A2A]"
    : "from-gray-50 to-white";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const cardBg = darkMode
    ? "bg-[#2A2A2A] border-[#C5A46D]/40"
    : "bg-white border-gray-300";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgMain} ${textMain} p-6 transition-colors duration-300`}
    >
      <h2 className="text-2xl font-bold mb-6 text-[#C5A46D]">
        Health Overview
      </h2>

      {/* Habits Tracker */}
      <div
        className={`mb-8 p-5 rounded-xl shadow-lg border transition ${cardBg}`}
      >
        <h3 className="text-xl font-semibold mb-4 text-[#C5A46D]">
          Daily Habits
        </h3>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <label
              key={habit.id}
              className={`flex items-center justify-between px-4 py-2 rounded-lg border transition ${
                darkMode
                  ? "bg-[#1E1E1E] border-[#C5A46D]/40 hover:border-[#C5A46D]"
                  : "bg-gray-50 border-gray-300 hover:border-yellow-500"
              }`}
            >
              <span
                className={`${
                  habit.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {habit.name}
              </span>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className="accent-[#C5A46D] w-5 h-5 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Responsive Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sleep Tracker */}
        <div
          className={`p-5 rounded-xl shadow-lg border transition ${cardBg}`}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#C5A46D]">
            Sleep (hours)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sleepData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#3A3A3A" : "#ddd"}
              />
              <XAxis dataKey="day" stroke="#C5A46D" />
              <YAxis stroke="#C5A46D" />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1E1E1E" : "#fff",
                  border: `1px solid ${darkMode ? "#C5A46D" : "#ddd"}`,
                  color: darkMode ? "#fff" : "#000",
                }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#C5A46D"
                strokeWidth={2}
                dot={{ fill: "#C5A46D" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Steps Tracker */}
        <div
          className={`p-5 rounded-xl shadow-lg border transition ${cardBg}`}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#C5A46D]">
            Steps (per day)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stepsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#3A3A3A" : "#ddd"}
              />
              <XAxis dataKey="day" stroke="#C5A46D" />
              <YAxis stroke="#C5A46D" />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1E1E1E" : "#fff",
                  border: `1px solid ${darkMode ? "#C5A46D" : "#ddd"}`,
                  color: darkMode ? "#fff" : "#000",
                }}
              />
              <Bar dataKey="steps" fill="#C5A46D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Health;
