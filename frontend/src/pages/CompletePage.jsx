import { useMemo, useState } from "react";
import { useTaskStore } from "../store/useTaskStore.js";
import TaskModel from "../components/TaskModel";
import TaskCard from "../components/TaskCard";
import { CheckCircle2, Plus } from "lucide-react";

const CompletePage = () => {
  const { tasks } = useTaskStore();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const filteredTasks = useMemo(() => {
    const completedTaskes = tasks.filter((t) => t.isCompleted);

    return completedTaskes.sort((a, b) => {
      // sort by newest/oldest
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      // sort by priority
      const order = { high: 3, mediun: 2, low: 1 };
      return order[b.priority] - order[a.priority];
    });
  }, [tasks, sortBy]);

  return (
    <div className="p-2 md:p-6 min-h-full overflow-hidden">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            Completed Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 && "s"}{" "}
            completed yet
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">Priority First</option>
        </select>
      </div>

      {/* ADD NEW TASK */}
      <div
        className="p-3.5 md:p-5 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 transition-colors cursor-pointer mb-6 bg-purple-50/50 group"
        onClick={() => setShowModel(true)}
      >
        <div className="flex items-center justify-center gap-3 text-gray-500 group-hover:text-purple-500 transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Task</span>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-purple-500" />
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-0.5">
              No completed tasks yet!
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Complete some tasks and they'll appear here
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
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => { setShowModel(true); setSelectedTask(task) }}
            />
          ))
        )}
      </div>

      {/* MODEL  */}
      {showModel && (
        <TaskModel
          closeModel={() => { setShowModel(false); setSelectedTask(false) }}
          selectedTask={selectedTask}
          key={"model"}
        />
      )}
    </div>
  );
};

export default CompletePage;
