import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

const Planner = () => {
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
      backgroundColor: "#C5A46D",
      borderColor: "#C5A46D",
      textColor: "#1E1E1E",
    };

    setTasks([...tasks, newTask]);
    setTitle(""); setDate(""); setTime(""); setNote(""); setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-[#1E1E1E] text-white">
      <h2 className="text-2xl font-bold mb-4">Weekly Planner</h2>

      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 rounded-lg bg-[#C5A46D] text-[#1E1E1E] font-semibold hover:bg-yellow-600 transition"
      >
        Add Task
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md relative border border-[#C5A46D]">
            <h3 className="text-xl font-bold mb-4 text-[#C5A46D]">New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full mb-3 p-2 rounded border border-[#C5A46D] bg-[#1E1E1E] text-white placeholder-[#C5A46D] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              value={title} onChange={e => setTitle(e.target.value)}
            />
            <input
              type="date"
              className="w-full mb-3 p-2 rounded border border-[#C5A46D] bg-[#1E1E1E] text-white focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              value={date} onChange={e => setDate(e.target.value)}
            />
            <input
              type="time"
              className="w-full mb-3 p-2 rounded border border-[#C5A46D] bg-[#1E1E1E] text-white focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              value={time} onChange={e => setTime(e.target.value)}
            />
            <textarea
              placeholder="Note"
              className="w-full mb-3 p-2 rounded border border-[#C5A46D] bg-[#1E1E1E] text-white placeholder-[#C5A46D] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              value={note} onChange={e => setNote(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E]"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 rounded-lg bg-[#C5A46D] text-[#1E1E1E] font-semibold hover:bg-yellow-600"
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
        eventColor="#C5A46D"
        themeSystem="standard"
        contentHeight="auto"
        // Tailwind custom styles
        dayHeaderClassNames="text-[#C5A46D] bg-[#1E1E1E]"
        slotLabelClassNames="text-gray-400"
      />
    </div>
  );
};

export default Planner;
