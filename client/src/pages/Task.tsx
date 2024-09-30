import { deleteTask, getTaskList, T_TASK } from "@/api/config";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task-list"],
    queryFn: getTaskList,
    select: (d) => (d ? d.r : []),
  });

  const handleUpdate = (item: T_TASK) => {
    navigate(`/update/${item._id}`, { state: item });
  };

  const handleDelete = async (id: string) => {
    const data = await deleteTask(id);

    if (data.s) {
      alert(data.m);
      refetch();
      return;
    }

    alert(data.m);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between w-full shadow-md h-16 p-4 items-center">
        <div>Task</div>
        <Button onClick={() => navigate("/create")}>Add New Task</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen text-2xl">
          {" "}
          Loading...{" "}
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <div className="flex justify-center items-center w-full h-screen text-2xl">
              No Data Found
            </div>
          ) : (
            <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-4 p-4">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 shadow-md rounded-md border flex flex-col gap-3"
                >
                  <p>Title : {item.title} </p>
                  <p> Description :{item.description} </p>
                  <p>
                    {" "}
                    is Completed :{" "}
                    {item.completed ? "Completed" : "Not Completed"}{" "}
                  </p>

                  <div className="flex gap-3">
                    <Button onClick={() => handleUpdate(item)}>Update </Button>
                    <Button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
