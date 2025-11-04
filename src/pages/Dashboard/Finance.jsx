import React, { useState, useEffect, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const Finance = () => {
  const { darkMode } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!amount || !desc) return;
    const newTx = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      desc,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTx]);
    setIsModalOpen(false);
    setAmount("");
    setDesc("");
  };

  const deleteTx = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const chartData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#C5A46D", "#E74C3C"];

  // Theme-based colors
  const bgMain = darkMode
    ? "from-[#1E1E1E] to-[#2A2A2A]"
    : "from-gray-50 to-white";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const cardBg = darkMode
    ? "bg-[#2A2A2A] border-[#C5A46D]/30"
    : "bg-white border-gray-300";
  const modalBg = darkMode ? "bg-[#1E1E1E]" : "bg-white";

  return (
    <div
      className={`p-6 min-h-screen bg-gradient-to-b ${bgMain} ${textMain} transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#C5A46D]">Finance Tracker</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            darkMode
              ? "bg-[#C5A46D] text-[#1E1E1E] hover:bg-yellow-600"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          + Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div
          className={`p-4 rounded-xl border text-center transition ${cardBg}`}
        >
          <p className="text-gray-400">Total Income</p>
          <p className="text-2xl font-bold text-green-400">
            ${income.toFixed(2)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl border text-center transition ${cardBg}`}
        >
          <p className="text-gray-400">Total Expense</p>
          <p className="text-2xl font-bold text-red-400">
            ${expense.toFixed(2)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl border text-center transition ${cardBg}`}
        >
          <p className="text-gray-400">Balance</p>
          <p className="text-2xl font-bold text-[#C5A46D]">
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div
        className={`rounded-xl border p-6 mb-8 transition ${cardBg}`}
      >
        <h3 className="text-xl mb-4 font-semibold text-[#C5A46D]">
          Balance Overview
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1E1E1E" : "#ffffff",
                border: `1px solid ${darkMode ? "#C5A46D" : "#ddd"}`,
                color: darkMode ? "#fff" : "#000",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions List */}
      <div
        className={`rounded-xl border p-6 transition ${cardBg}`}
      >
        <h3 className="text-xl mb-4 font-semibold text-[#C5A46D]">
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions yet.</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  darkMode
                    ? "bg-[#1E1E1E] border-[#C5A46D]/20"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <div>
                  <p className="font-semibold">{t.desc}</p>
                  <p className="text-sm text-gray-400">{t.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold ${
                      t.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteTx(t.id)}
                    className="text-gray-400 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            className={`${modalBg} rounded-xl p-6 w-full max-w-md relative border ${
              darkMode ? "border-[#C5A46D]/30" : "border-gray-300"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-[#C5A46D]">
              Add Transaction
            </h3>

            <select
              className={`w-full mb-3 p-2 rounded border ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#C5A46D]/30 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-800"
              }`}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              className={`w-full mb-3 p-2 rounded border ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#C5A46D]/30 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-800"
              }`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className={`w-full mb-3 p-2 rounded border ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#C5A46D]/30 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-800"
              }`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg border transition ${
                  darkMode
                    ? "border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E]"
                    : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={addTransaction}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  darkMode
                    ? "bg-[#C5A46D] text-[#1E1E1E] hover:bg-yellow-600"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
