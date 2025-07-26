import { useState } from "react";
import { AlignLeft, Calendar, CheckCircle, Flag, PlusCircle, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { useTaskStore } from "../store/useTaskStore.js";

const TaskModel = ({ closeModel, selectedTask }) => {
  const [task, setTask] = useState({
    title: selectedTask?.title || "",
    description: selectedTask?.description || "",
    priority: selectedTask?.priority || "low",
    dueDate: selectedTask?.dueDate || "",
    isCompleted: selectedTask?.isCompleted || false
  });
  const { createTask, updateTask } = useTaskStore();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmint = (e) => {
    e.preventDefault();

    if (selectedTask) { // FOR UPDATE
      if (task.dueDate < today) {
        toast.error("Due date cannot be in the past!");
        return;
      }
      updateTask(selectedTask._id, task);
      closeModel();
    } else {            // CREATE NEW
      createTask(task);
      closeModel();
    }
  };

  return (
    // MODEL CONTAINER
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4"
      onClick={closeModel}
    >
      {/* MODEL */}
      <div
        className="bg-white border border-purple-200 rounded-xl max-w-md w-full shadow-lg relative p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODEL HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            {selectedTask?._id ? (
              <Save className="w-6 h-6 text-purple-500" />
            ) : (
              <PlusCircle className="w-6 h-6 text-purple-500" />
            )}
            {selectedTask?._id ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
            onClick={closeModel}
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* MODEL FORM */}
        <form className="space-y-4" onSubmit={handleSubmint}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder={"Enter task title"}
              className="px-2 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
              required
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-purple-500" />
              Description
            </label>
            <textarea
              placeholder={"Add details about your task"}
              className="px-2 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
              required
              value={task.description}
              onChange={e => setTask({ ...task, description: e.target.value })} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Flag className="w-4 h-4 text-purple-500" />
                Priority
              </label>
              <select 
                className="px-2 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none w-full"
                value={task.priority}
                onChange={e => setTask({ ...task, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                Due Date
              </label>
              <input
                min={today}
                type="date"
                className="px-2 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none w-full"
                required
                value={task.dueDate.split("T")[0]}
                onChange={e => setTask({ ...task, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-500" />
              Status
            </div>

            <div className="flex gap-4">
              <label
                htmlFor="completed"
                className="flex items-center gap-2 cursor-pointer text-gray-700"
              >
                <input
                  type="radio"
                  name="status"
                  id="completed"
                  className="accent-purple-500"
                  checked={task.isCompleted === true}
                  onChange={() => setTask({ ...task, isCompleted: true })}
                />
                Completed
              </label>

              <label
                htmlFor="inprogress"
                className="flex items-center gap-2 cursor-pointer text-gray-700"
              >
                <input
                  type="radio"
                  name="status"
                  id="inprogress"
                  className="accent-purple-500"
                  checked={task.isCompleted === false}
                  onChange={() => setTask({ ...task, isCompleted: false })}
                />
                In Progress
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-medium cursor-pointer"
          >
            {selectedTask ? (
              <>
                <Save className="w-4 h-4 text-white" />
                Edit Task
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 text-white" />
                Create Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModel;
