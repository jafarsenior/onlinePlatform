import React, { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  HelpCircle,
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const CalendarApp = () => {
  const { darkMode } = useContext(ThemeContext);

  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 3)); // November 3, 2025
  const [view, setView] = useState("week");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Information Technology System 234-room",
      start: new Date(2025, 10, 3, 12, 0),
      end: new Date(2025, 10, 3, 13, 20),
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Information Technology System 220-room Labs",
      start: new Date(2025, 10, 4, 12, 0),
      end: new Date(2025, 10, 4, 13, 20),
      color: "bg-blue-400",
    },
    {
      id: 3,
      title: "Talabar ES 250-room",
      start: new Date(2025, 10, 6, 12, 0),
      end: new Date(2025, 10, 6, 13, 20),
      color: "bg-green-400",
    },
    {
      id: 4,
      title: "Programming (practice) L3 242-room",
      start: new Date(2025, 10, 7, 12, 0),
      end: new Date(2025, 10, 7, 13, 20),
      color: "bg-indigo-500",
    },
    // Daily recurring event at 4 PM
    ...Array.from({ length: 7 }, (_, i) => ({
      id: 10 + i,
      title: "Ishga borishim kerak bus()",
      start: new Date(2025, 10, 2 + i, 16, 0),
      end: new Date(2025, 10, 2 + i, 16, 30),
      color: "bg-red-500",
    })),
  ]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getWeekDates = (date) => {
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(curr);
      d.setDate(first + i);
      return d;
    });
  };

  const weekDates = getWeekDates(currentDate);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 10, 3));
  };

  const formatTime = (hour) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  const isToday = (date) => {
    const today = new Date(2025, 10, 3);
    return date.toDateString() === today.toDateString();
  };

  const getEventsForDateAndHour = (date, hour) => {
    return events.filter((event) => {
      const eventDate = event.start.toDateString();
      const eventHour = event.start.getHours();
      return eventDate === date.toDateString() && eventHour === hour;
    });
  };

  const calculateEventPosition = (event) => {
    const minutes = event.start.getMinutes();
    const duration = (event.end - event.start) / (1000 * 60);
    return {
      top: `${(minutes / 60) * 100}%`,
      height: `${(duration / 60) * 100}%`,
    };
  };

  // 🎨 Ranglar holatga qarab
  const bgMain = darkMode ? "bg-[#1E1E1E]" : "bg-white";
  const borderColor = darkMode ? "border-[#2A2A2A]" : "border-gray-300";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const subText = darkMode ? "text-[#888]" : "text-gray-500";
  const accent = "text-[#C5A46D]";
  const todayBg = "bg-[#C5A46D] text-[#1E1E1E]";

  return (
    <div className={`h-screen flex flex-col ${bgMain} ${textMain}`}>
      {/* Header */}
      <div
        className={`flex items-center flex-wrap justify-between px-4 py-3 border-b ${borderColor}`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={goToToday}
            className="px-4 py-2 max-md:px-2 max-md:py-1 rounded-lg border border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition font-medium"
          >
            Today
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek(-1)}
              className={`p-2 hover:${borderColor} rounded-full transition ${accent}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigateWeek(1)}
              className={`p-2 hover:${borderColor} rounded-full transition ${accent}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <h1
            className={`text-xl font-normal max-md:text-lg ${
              darkMode ? "text-[#E0E0E0]" : "text-gray-700"
            }`}
          >
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`p-2 hover:${borderColor} rounded-full transition ${accent} max-sm:hidden`}
          >
            <Search size={20} />
          </button>
          <button
            className={`p-2 hover:${borderColor} rounded-full transition ${accent} max-sm:hidden`}
          >
            <HelpCircle size={20} />
          </button>

          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className={`px-4 py-2 max-md:px-2 max-md:py-1 rounded-lg ${
              darkMode
                ? "bg-[#2A2A2A] text-[#C5A46D] border border-[#C5A46D]"
                : "bg-gray-100 text-gray-800 border border-gray-300"
            } hover:bg-opacity-90 transition cursor-pointer`}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          {/* Week Header */}
          <div className={`sticky top-0 ${bgMain} z-20 border-b ${borderColor}`}>
            <div className="flex">
              <div
                className={`w-20 flex-shrink-0 border-r ${borderColor} text-right pr-2 py-2 text-xs ${subText}`}
              >
                GMT+05
              </div>
              {weekDates.map((date, i) => (
                <div
                  key={i}
                  className={`flex-1 text-center py-2 border-r ${borderColor} last:border-r-0`}
                >
                  <div className={`text-xs ${subText} mb-1`}>{weekDays[i]}</div>
                  <div
                    className={`text-2xl ${
                      isToday(date)
                        ? `${todayBg} rounded-full w-12 h-12 flex items-center justify-center mx-auto font-semibold`
                        : darkMode
                        ? "text-[#E0E0E0]"
                        : "text-gray-800"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Grid */}
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className={`flex border-b ${borderColor} relative`}
                style={{ height: "60px" }}
              >
                <div
                  className={`w-20 flex-shrink-0 border-r ${borderColor} text-right pr-2 pt-1 text-xs ${subText}`}
                >
                  {hour === 0 ? "" : formatTime(hour)}
                </div>
                {weekDates.map((date, dayIndex) => {
                  const dayEvents = getEventsForDateAndHour(date, hour);
                  return (
                    <div
                      key={dayIndex}
                      className={`flex-1 border-r ${borderColor} last:border-r-0 relative`}
                    >
                      {dayEvents.map((event) => {
                        const position = calculateEventPosition(event);
                        return (
                          <div
                            key={event.id}
                            className={`absolute left-0 right-0 mx-1 ${event.color} rounded px-2 py-1 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition shadow-md`}
                            style={{
                              top: position.top,
                              height: position.height,
                              minHeight: "20px",
                            }}
                          >
                            <div className="font-medium text-white truncate">
                              {event.title}
                            </div>
                            <div className="text-white text-opacity-90">
                              {event.start.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: false,
                              })}{" "}
                              –{" "}
                              {event.end.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
