import { createTask, T_TASK, updateTask } from "@/api/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskValidation = z.object({
  title: z.string().min(1, "Title is required..."),

  description: z.string().min(1, "Description is required..."),

  completed: z.boolean({ required_error: "Completed is required..." }),
});

export type Task = z.infer<typeof taskValidation>;

type FormProps = {
  id: string | undefined;
  data: T_TASK | undefined;
};

const Form = ({ id, data }: FormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Task>({
    mode: "all",
    resolver: zodResolver(taskValidation),
  });

  const onSubmit = async (values: Task) => {
    let data;

    if (id) {
      data = await updateTask({ id, data: values });
    } else {
      data = await createTask(values);
    }
    if (data.s) {
      alert(data.m);
      navigate("/");
      return;
    }

    alert(data.m);
  };

  useEffect(() => {
    if (data) {
      reset({
        completed: data.completed,
        description: data.description,
        title: data.title,
      });
    }
  }, [id, data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
      <div>
        <Label>Title</Label>
        <Input type="text" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {" "}
            {errors.title?.message as string}{" "}
          </p>
        )}
      </div>

      <div>
        <Label>Description</Label>
        <Input type="text" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">
            {" "}
            {errors.description?.message as string}
          </p>
        )}
      </div>

      <Controller
        name="completed"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={field.value}
              onCheckedChange={(c) => field.onChange(c)}
            />
            <Label htmlFor="airplane-mode">is Completed</Label>
          </div>
        )}
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default Form;
