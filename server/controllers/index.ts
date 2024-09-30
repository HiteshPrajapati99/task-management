import { Request, Response } from "express";
import { z } from "zod";
import { task } from "../models/Task";

const taskValidation = z.object({
  title: z.string({ required_error: "Title is required..." }),

  description: z.string({ required_error: "Description is required..." }),

  completed: z.boolean({ required_error: "Completed is required..." }),
});

const taskValidationUpdate = z.object({
  title: z.string().optional(),

  description: z.string().optional(),

  completed: z.boolean().optional(),

  id: z.string({ required_error: "Task id is required..." }),
});

export const createTask = async (req: Request, res: Response) => {
  try {
    const data = taskValidation.safeParse(req.body);

    if (data.error) {
      res.json({ s: 0, m: data.error.errors[0].message, r: null });
      return;
    }

    const newTask = await task.create(data.data);

    res.json({ s: 1, m: "New task created", r: newTask });
  } catch (error) {
    res.json({ s: 0, m: "Server Error" });
  }
};

export const getTaskList = async (req: Request, res: Response) => {
  try {
    const tasks = await task.find({
      status: 1,
    });

    if (tasks.length === 0) {
      res.json({ s: 0, m: "No Task found", r: [] });
      return;
    }

    res.json({ s: 1, m: "Task found.", r: tasks });
  } catch (error) {
    res.json({ s: 0, m: "Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params?.id;
    const data = taskValidationUpdate.safeParse({ ...req.body, id });

    if (data.error) {
      res.json({ s: 0, m: data.error.errors[0].message, r: null });
      return;
    }

    const { completed, description, title } = data.data;

    if (completed === undefined || !description || !title) {
      res.json({
        s: 0,
        m: "at list one  fiedl is required for update task",
      });
      return;
    }

    const updatedTask = await task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
      },
      { new: true }
    );

    res.json({ s: 1, m: "Task updated success", r: updatedTask });
  } catch (error) {
    res.json({ s: 0, m: "Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.params?.id || req.params?.id === null) {
      res.json({ s: 0, m: "Task id required..." });
      return;
    }

    const deletedTask = await task.findByIdAndUpdate(req.params?.id, {
      status: 0,
    });

    if (!deletedTask) {
      res.json({ s: 0, m: "No Task found", r: [] });
      return;
    }

    res.json({ s: 1, m: "Task Deleted Success.", r: deletedTask });
  } catch (error) {
    res.json({ s: 0, m: "Server Error" });
  }
};
