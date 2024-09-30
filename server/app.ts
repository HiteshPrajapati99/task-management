import expres from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";

const app = expres();

app.use(expres.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/task")
  .then(() => {
    console.log("DB Connected.");
  })
  .catch((error) => {
    console.log("DB Error:- " + error);
  });

app.use("/api", router);

app.listen(5000, () => {
  console.log("Server is running on port :-" + 5000);
});
