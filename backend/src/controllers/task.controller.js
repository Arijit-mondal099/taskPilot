import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const owner = req.user._id;

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      owner,
      isCompleted: completed === "yes" || completed === true,
    });

    await newTask.save();
    res.status(201).json({ sussess: true, task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id }).populate("owner", "name email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("owner", "name email");
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
}

export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, isCompleted } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.isCompleted = isCompleted === true || isCompleted === "yes";

    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
}
