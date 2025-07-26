import { useState } from "react";
import { Calendar, CheckCircle, Clock, Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore.js";
import { format, isToday } from "date-fns";

const TaskCard = ({ task, onEdit }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(task.isCompleted || false);
  const { updateTask, deleteTask } = useTaskStore();
  const borderColor = task.isCompleted ? "border-green-200" : "border-red-200";

  const handleCompleteTask = () => {
    setUpdateComplete(prev => {
      // update state
      const newValue = !prev;
      // update task completed
      updateTask(task._id, { ...task, isCompleted: newValue });
      // return new state value
      return newValue;
    });
  }

  return (
    <div
      className={`group p-4 sm:p-5 rounded-xl shadow-sm bg-white transition-all border ${borderColor}`}
    >
      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
        <button
          onClick={handleCompleteTask}
          className={`mt-0.5 sm:mt-1 p-1 sm:p-1.5 rounded-full hover:bg-purple-100 transition-colors duration-300
            ${updateComplete ? "text-green-400" : "text-gray-400"} cursor-pointer
          `}
        >
          <CheckCircle
            className={`w-4 h-4 sm:w-5 sm:h-5 ${updateComplete && "fill-green-400 text-white border border-purple-500"} rounded-full`}
          />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 
              className={`text-base sm:text-lg font-medium truncate 
                ${updateComplete ? "text-gray-400 line-through" : "text-gray-700"}`
              }
            >
              {task.title}
            </h3>

            <span
              className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${task.priority === "low" && "bg-green-100"} ${task.priority === "medium" && "bg-blue-100"} ${task.priority === "high" && "bg-red-100"} capitalize`}
            >
              {task.priority}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1 truncate">
            {task.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-1 sm:p-1.5 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-700 transition-colors duration-200 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4 sm:h-5 sm:w-5" />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-1 w-40 sm:w-48 bg-white border border-purple-100 rounded-xl shadow-lg z-10 overflow-hidden animate-fadeIn">
                <div 
                  className="flex items-center gap-2 hover:bg-purple-100 transition-all p-2 cursor-pointer text-sm"
                  onClick={() => { onEdit(); setOpenMenu(false) }}
                >
                  <Edit2 className="w-5 h-5 text-purple-500" />
                  Edit Task
                </div>

                <div 
                  className="flex items-center gap-2 hover:bg-purple-100 transition-all p-2 cursor-pointer text-sm"
                  onClick={() => { deleteTask(task._id); setOpenMenu(false) }}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                  Delete Task
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <div className={`flex items-center gap-1.5 text-xs font-medium whitespace-nowrap 
              ${isToday(new Date(task.dueDate)) ? "text-fuchsia-500" : "text-gray-500"}`}
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              {isToday(new Date(task.dueDate)) ? "Today" : format(new Date(task.dueDate), "MMM dd")}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap mt-1">
              <Clock className="w-4 h-4 text-gray-400" />
              {`Created ${format(new Date(task.createdAt), "MMM dd")}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
