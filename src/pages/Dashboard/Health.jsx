import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const Health = () => {
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
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#C5A46D]">Health Overview</h2>

      {/* Habits Tracker */}
      <div className="mb-8 bg-[#2A2A2A] p-5 rounded-xl shadow-lg border border-[#C5A46D]/40">
        <h3 className="text-xl font-semibold mb-4 text-[#C5A46D]">Daily Habits</h3>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <label
              key={habit.id}
              className="flex items-center justify-between bg-[#1E1E1E] px-4 py-2 rounded-lg border border-[#C5A46D]/40 hover:border-[#C5A46D] transition"
            >
              <span className={`${habit.completed ? "line-through text-gray-400" : ""}`}>
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
        <div className="bg-[#2A2A2A] p-5 rounded-xl shadow-lg border border-[#C5A46D]/40">
          <h3 className="text-lg font-semibold mb-4 text-[#C5A46D]">Sleep (hours)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
              <XAxis dataKey="day" stroke="#C5A46D" />
              <YAxis stroke="#C5A46D" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #C5A46D", color: "#fff" }}
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
        <div className="bg-[#2A2A2A] p-5 rounded-xl shadow-lg border border-[#C5A46D]/40">
          <h3 className="text-lg font-semibold mb-4 text-[#C5A46D]">Steps (per day)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stepsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
              <XAxis dataKey="day" stroke="#C5A46D" />
              <YAxis stroke="#C5A46D" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #C5A46D", color: "#fff" }}
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
