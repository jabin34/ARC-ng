import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/tasks";
    axios.get(url).then((res) => setTasks(res.data));
  }, []);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/task/${id}`).then((res) => {
      if (res.status === 200) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks([...newTasks]);
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    });
  };
  return (
    <div className="mt-20">
      <div>
        <Link
          to="/addtask"
          className="btn btn-primary flex mx-auto my-5 text-white w-48"
        >
          Add Task
        </Link>
      </div>
      <div className="overflow-x-auto mx-2">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {tasks.map((task, index) => {
              return (
                <tr key={task._id} className="hover hover:text-primary">
                  <td>{index + 1}</td>
                  <td>{task.taskName}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.taskComment}</td>
                  <td>
                    <label htmlFor="my-modal" className="btn btn-error btn-sm">
                      Delete
                    </label>
                    <DeleteModal
                      deleteHandler={deleteHandler}
                      taskID={task._id}
                      taskName={task.taskName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;