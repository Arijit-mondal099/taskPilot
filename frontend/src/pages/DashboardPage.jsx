import { useMemo, useState } from "react";
import { Calendar, Filter, Plus } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore.js";
import { FILTER_LABELS, FILTER_OPTIONS, STATS } from "../constants";
import TaskCard from "../components/TaskCard";
import TaskModel from "../components/TaskModel";

const DashboardPage = () => {
  const { tasks } = useTaskStore();
  const [showModel, setShowModel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const tasksStats = useMemo(() => {
    const total = tasks.length;
    const lowPriority = tasks.filter(task => task.priority === "low").length;
    const mediumPriority = tasks.filter(task => task.priority === "medium").length;
    const highPriority = tasks.filter(task => task.priority === "high").length;
    const completedTasks = tasks.filter(task => task.completed).length;

    return {
      total,
      lowPriority,
      mediumPriority,
      highPriority,
      completedTasks
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => tasks?.filter(task => {
    const dueDate = new Date(task?.dueDate);
    const today = new Date();
    const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
    
    switch (filter) {
      case "today":
        return dueDate.toDateString() === today.toDateString();
      case "week":
        return dueDate >= today && dueDate <= nextWeek;
      case "completed":
        return task.completed;
      case "pending":
        return !task.completed;
      case "low":
        return task.priority === "low";
      case "medium":
        return task.priority === "medium";
      case "high":
        return task.priority === "high";
      default:
        return true; // Show all tasks if no filter is applied
    }
  }), [tasks, filter]);

  return (
    <div className="p-2 md:p-6 min-h-screen overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 flex items-center gap-2">
            <span className="truncate">Task Overview</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 truncate">
            Manage your task efficiently
          </p>
        </div>

        <button
          onClick={() => setShowModel(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm w-full md:w-auto justify-center text-sm md:text-base cursor-pointer"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-medium">Add New Task</span>
        </button>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            className={`flex items-center p-4 rounded-lg shadow-sm border border-gray-200 bg-white`}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${stat.iconColor} mr-4`}>
              <stat.icon className={`w-6 h-6 "text-gray-600`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-semibold text-gray-700">{stat.label}</span>
              <span className="text-lg md:text-xl font-bold text-gray-900">{tasksStats[stat.key]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TASKS SECTION */}
      <div className="space-y-6">
        {/* FILTER SECTION */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-5 h-5 text-purple-500 shrink-0" />
            <h2 className="text-base text-gray-700 font-semibold">
              {FILTER_LABELS[filter] || "All Tasks"}
            </h2>
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm capitalize"
          >
            {FILTER_OPTIONS.map(option => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* TASK LIST */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-0.5">
                No tasks found
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {filter === "all" ? "Create your first task to get started" : "No tasks match this filter"}
              </p>

              <button
                onClick={() => setShowModel(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm md:text-base cursor-pointer mx-auto"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">Add New Task</span>
              </button>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task}
                onEdit={() => { setShowModel(true); setSelectedTask(task) }}
              />
            ))
          )}
        </div>

        {/* MODEL SECTION */}
        {showModel && <TaskModel
          closeModel={() => { setShowModel(false); setSelectedTask(null) }} 
          selectedTask={selectedTask}
        />}
      </div>
    </div>
  );
};

export default DashboardPage;
