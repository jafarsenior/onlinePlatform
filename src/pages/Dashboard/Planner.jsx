import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { ThemeContext } from "../../context/ThemeContext";

const Planner = () => {
  const { darkMode } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // LocalStorage dan yuklash
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // LocalStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title || !date) return;

    const newTask = {
      id: Date.now(),
      title,
      start: dayjs(`${date}T${time || "08:00"}`).toDate(),
      end: dayjs(`${date}T${time || "08:00"}`).add(1, "hour").toDate(),
      extendedProps: { note },
      backgroundColor: darkMode ? "#C5A46D" : "#FACC15",
      borderColor: darkMode ? "#C5A46D" : "#FACC15",
      textColor: darkMode ? "#1E1E1E" : "#1E1E1E",
    };

    setTasks([...tasks, newTask]);
    setTitle(""); setDate(""); setTime(""); setNote(""); setIsModalOpen(false);
  };

  const bgMain = darkMode ? "bg-[#1E1E1E] text-[#C5A46D]" : "bg-white text-gray-800";
  const inputBg = darkMode ? "bg-[#2A2A2A] text-[#C5A46D]" : "bg-gray-100 text-gray-800";
  const inputBorder = darkMode ? "border-[#C5A46D]" : "border-gray-300";
  const buttonPrimary = darkMode ? "bg-[#C5A46D] text-[#1E1E1E] hover:bg-[#C5A16D]" : "bg-[#C5A46D] text-[#1E1E1E] hover:bg-[#C5A16D]";
  const buttonSecondary = darkMode ? "border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E]" : "border-gray-400 text-gray-700 hover:bg-yellow-100 hover:text-[#1E1E1E]";

  return (
    <div className={`p-4 md:p-6 min-h-screen ${bgMain} transition-colors duration-300`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Weekly Planner</h2>

      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`mb-4 px-4 py-2 rounded-lg font-semibold ${buttonPrimary} transition-colors`}
      >
        Add Task
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl p-6 w-full max-w-md relative border ${inputBorder} ${bgMain} transition-colors`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-[#C5A46D]" : "text-yellow-600"}`}>New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              className={`w-full mb-3 p-2 rounded border ${inputBorder} ${inputBg} placeholder-[#C5A46D] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]`}
              value={title} onChange={e => setTitle(e.target.value)}
            />
            <input
              type="date"
              className={`w-full mb-3 p-2 rounded border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-[#C5A46D]`}
              value={date} onChange={e => setDate(e.target.value)}
            />
            <input
              type="time"
              className={`w-full mb-3 p-2 rounded border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-[#C5A46D]`}
              value={time} onChange={e => setTime(e.target.value)}
            />
            <textarea
              placeholder="Note"
              className={`w-full mb-3 p-2 rounded border ${inputBorder} ${inputBg} placeholder-[#C5A46D] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]`}
              value={note} onChange={e => setNote(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg border ${buttonSecondary}`}
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className={`px-4 py-2 rounded-lg font-semibold ${buttonPrimary}`}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FullCalendar: Weekly view */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        events={tasks}
        allDaySlot={false}
        height="auto"
        eventClick={(info) =>
          alert(`${info.event.title}\n${info.event.start.toLocaleString()}\nNote: ${info.event.extendedProps.note}`)
        }
        nowIndicator={true}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dayHeaderFormat={{ weekday: "short" }}
        eventColor={darkMode ? "#C5A46D" : "#FACC15"}
        themeSystem="standard"
        contentHeight="auto"
        dayHeaderClassNames={darkMode ? "text-[#C5A46D] bg-[#1E1E1E]" : "text-yellow-600 bg-yellow-50"}
        slotLabelClassNames={darkMode ? "text-gray-400" : "text-gray-600"}
        expandRows={true}
        nowIndicator={true}
      />
    </div>
  );
};

export default Planner;
