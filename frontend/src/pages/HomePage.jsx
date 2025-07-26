import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";
import { Clock, TrendingUp, Zap } from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Skeleton from "../components/skeletonLoading/Skeleton";

const HomePage = () => {
  const { tasks, isTasksLoading, fetchTasks } = useTaskStore();
  const location = useLocation();

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t => t.isCompleted === true || t.isCompleted === "yes").length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage,
    };
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // STATISTIC CARD
  const StatCard = ({ title, value, icon }) => (
    <div className="p-2 sm:p-3 rounded-xl bg-white shadow-sm border border-purple-50 hover:shadow-md hover:border-purple-100 transition-all duration-300 group">
      <div className="flex items-center gap-2">
        <div className="min-w-0">
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
      </div>
    </div>
  );

  // LODING
  if (isTasksLoading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <Skeleton />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <div className="ml-0 lg:ml-64 md:ml-16 pt-16 p-3 md:p-4 transition-all duration-300">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* CHILD ELEMENT SHOW HERE */}
          <div className="xl:col-span-2 space-y-3 sm:space-y-4">
            <Outlet />
          </div>

          {/* TASK STATISTICS */}
          {location.pathname !== "/profile" && (
            <div className="xl:col-span-1 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border-border-purple-100">
                {/* HEADING */}
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 font-bold" />
                  Task Statistics
                </h3>

                {/* DEFF STATS CARDS */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <StatCard
                    title={"Total Tasks"}
                    value={stats.totalTasks}
                  />

                  <StatCard
                    title={"Completed"}
                    value={stats.completedTasks}
                  />

                  <StatCard
                    title={"Pending"}
                    value={stats.pendingTasks}
                  />

                  <StatCard
                    title={"Completion Rate"}
                    value={stats.completionPercentage + "%"}
                  />
                </div>

                <hr className="my-3 sm:my-4 border-purple-100" />

                {/* TASKS PROGRESS */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                      <Zap className="w-5 h-5 text-purple-500" />
                      Task Progress
                    </span>

                    <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 sm:px-2 rounded-full">
                      {stats.totalTasks === 0 ? "0" : stats.completedTasks}/{stats.totalTasks}
                    </span>
                  </div>

                  {/* PROGRESH BAR */}
                  <div className="relative pt-1">
                    <div className="flex gap-1.5 items-center">
                      <div className="flex-1 h-2 sm:h-3 bg-purple-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-300"
                          style={{ width: `${stats.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="bg-white rounded-xl mt-4 p-4 sm:p-5 shadow-sm border border-purple-100">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  Recent Activity
                </h3>

                <div className="space-y-2 sm:space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 break-words whitespace-normal">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full shrink-0 ml-2 ${
                          task.isCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-fuchsia-100 text-fuchsia-700"
                        }`}
                      >
                        {task.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}

                  {tasks.length === 0 && (
                    <div className="text-center py-4 sm:py-6 px-2">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 rounded-full bg-fuchsia-100 flex items-center justify-center">
                        <Clock className="w-6 h-6 sm:w-6 sm:h-6 text-purple-500" />
                      </div>
                      <p className="text-sm text-gray-500">
                        No recent activity
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Tasks will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
