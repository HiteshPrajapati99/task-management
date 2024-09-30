import { useLocation, useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import { Button } from "@/components/ui/button";

const AddUpdate = () => {
  const { id } = useParams();
  const data = useLocation().state;
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <p className="text-2xl text-center"> {id ? "Update" : "Add"} Form </p>
      </div>
      <Form id={id} data={data} />
    </div>
  );
};

export default AddUpdate;
