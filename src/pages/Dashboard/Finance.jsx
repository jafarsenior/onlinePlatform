// src/pages/Dashboard/Finance.jsx
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Finance = () => {
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

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A] text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#C5A46D]">Finance Tracker</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-[#C5A46D] text-[#1E1E1E] font-semibold hover:scale-[1.05] transition"
        >
          + Add Transaction
        </button>
      </div>

      {/* Balance Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-[#2A2A2A] border border-[#C5A46D]/30 text-center">
          <p className="text-gray-400">Total Income</p>
          <p className="text-2xl font-bold text-green-400">${income.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#2A2A2A] border border-[#C5A46D]/30 text-center">
          <p className="text-gray-400">Total Expense</p>
          <p className="text-2xl font-bold text-red-400">${expense.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#2A2A2A] border border-[#C5A46D]/30 text-center">
          <p className="text-gray-400">Balance</p>
          <p className="text-2xl font-bold text-[#C5A46D]">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-[#2A2A2A] border border-[#C5A46D]/20 rounded-xl p-6 mb-8">
        <h3 className="text-xl mb-4 font-semibold text-[#C5A46D]">Balance Overview</h3>
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
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #C5A46D" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions List */}
      <div className="bg-[#2A2A2A] border border-[#C5A46D]/20 rounded-xl p-6">
        <h3 className="text-xl mb-4 font-semibold text-[#C5A46D]">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions yet.</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-[#1E1E1E] p-3 rounded-lg border border-[#C5A46D]/20"
              >
                <div>
                  <p className="font-semibold">{t.desc}</p>
                  <p className="text-sm text-gray-400">{t.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
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
          <div className="bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md relative border border-[#C5A46D]/30">
            <h3 className="text-xl font-bold mb-4 text-[#C5A46D]">Add Transaction</h3>

            <select
              className="w-full mb-3 p-2 rounded bg-[#2A2A2A] border border-[#C5A46D]/30 text-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              className="w-full mb-3 p-2 rounded bg-[#2A2A2A] border border-[#C5A46D]/30 text-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full mb-3 p-2 rounded bg-[#2A2A2A] border border-[#C5A46D]/30 text-white"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
              >
                Cancel
              </button>
              <button
                onClick={addTransaction}
                className="px-4 py-2 rounded-lg bg-[#C5A46D] text-[#1E1E1E] font-semibold hover:bg-yellow-600 transition"
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
