import { HomeIcon, Flame, Home, ListChecks, CheckCircle2 } from "lucide-react";

export const menuItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    text: "Pending Tasks",
    path: "/pending",
    icon: ListChecks,
  },
  {
    text: "Completed Tasks",
    path: "/complete",
    icon: CheckCircle2,
  },
];

export const STATS = [
  {
    key: "total",
    label: "Total Tasks",
    icon: HomeIcon,
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    key: "lowPriority",
    label: "Low Priority",
    icon: Flame,
    iconColor: "bg-green-100 text-green-600",
  },
  {
    key: "mediumPriority",
    label: "Medium Priority",
    icon: Flame,
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    key: "highPriority",
    label: "High Priority",
    icon: Flame,
    iconColor: "bg-red-100 text-red-600",
  },
];

// Filter options
export const FILTER_OPTIONS = ["all", "today", "week", "high", "medium", "low"];
export const FILTER_LABELS = {
  all: "All Tasks",
  today: "Today's Tasks",
  week: "This Week",
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
};
