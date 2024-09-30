import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:5000/api";

type API_RES<T> = {
  s: number;
  m: string;
  r: T;
};

export type T_TASK = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

export const getTaskList = async (): Promise<API_RES<T_TASK[]>> => {
  try {
    const { data } = await axios.get(API_URL + "/" + "tasks");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        s: 0,
        m: error.response?.data.m || "Opps!, something went wrong.",
        r: [],
      };
    }
    return {
      s: 0,
      r: [],
      m: "Opps!, something went wrong.",
    };
  }
};

export const createTask = async (
  data: Record<string, unknown>
): Promise<API_RES<unknown>> => {
  try {
    const { data: res } = await axios.post(API_URL + "/" + "tasks", data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        s: 0,
        r: null,
        m: error.response?.data.m || "Opps!, something went wrong.",
      };
    }
    return {
      s: 0,
      r: null,
      m: "Opps!, something went wrong.",
    };
  }
};

export const deleteTask = async (id: string): Promise<API_RES<unknown>> => {
  try {
    const { data: res } = await axios.delete(API_URL + "/" + "tasks/" + id);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        s: 0,
        r: null,
        m: error.response?.data.m || "Opps!, something went wrong.",
      };
    }
    return {
      s: 0,
      r: null,
      m: "Opps!, something went wrong.",
    };
  }
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}): Promise<API_RES<unknown>> => {
  try {
    const { data: res } = await axios.put(API_URL + "/" + "tasks/" + id, data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        s: 0,
        r: null,
        m: error.response?.data.m || "Opps!, something went wrong.",
      };
    }
    return {
      s: 0,
      r: null,
      m: "Opps!, something went wrong.",
    };
  }
};
