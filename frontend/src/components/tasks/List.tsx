import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { FaPlus } from "react-icons/fa";
import Task from "@/components/tasks/Task";
import { toast } from "react-toastify";
import { api } from "../api/api";

type Props = {
  list?: Lists;
};
export default function List({ list }: Props) {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [showTaskInput, setShowTaskInput] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    if (list?.tasks) {
      setTasks(list.tasks);
    }
  }, [list]);

  const Todo = tasks.filter((item) => item.state === "Todo");
  const Doing = tasks.filter((item) => item.state === "Doing");
  const Done = tasks.filter((item) => item.state === "Done");

  function handleShowTaskInput(state: string) {
    setShowTaskInput(state);
  }

  const handleAddTask = async (state: string) => {
    if (taskTitle.length > 0) {
      try {
        const body = { title: taskTitle, state: state, list: list?.id };
        const response = await api.post("task/create/", body);
        if (response.status === 201) {
          const allTasks = [...tasks, response.data];
          setTasks(allTasks);
          setTaskTitle("");
          handleShowTaskInput("");
        } else {
          toast.error("خطا در ساخت کار");
        }
      } catch (error) {
        console.error(error);
        toast.error("خطا در ساخت کار");
      }
    } else {
      toast.error("عنوان نباید خالی باشد");
    }
  };

  return (
    <>
      <div className={styles["list"]}>
        <span className={styles["list-title"]}>{list?.title}</span>

        <div className={styles["task"]}>
          <span>
            <p>Todo ({Todo.length})</p>

            <i
              onClick={() => {
                handleShowTaskInput("Todo");
              }}
            >
              <FaPlus />
            </i>
          </span>

          {Todo &&
            Todo.length > 0 &&
            Todo.map((item) => (
              <Task
                key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}

          <div
            className={styles["input-box"]}
            style={{ display: showTaskInput === "Todo" ? "flex" : "none" }}
          >
            <input
              className={styles["task-input"]}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="عنوان کار"
            />
            <div className={styles["input-box-footer"]}>
              <button
                className={styles["btn"]}
                onClick={() => handleAddTask("Todo")}
              >
                ذخیره
              </button>
              <button
                className={styles["cancel"]}
                onClick={() => handleShowTaskInput("")}
              >
                لغو
              </button>
            </div>
          </div>
        </div>

        <div className={styles["task"]}>
          <span>
            <p>Doing ({Doing.length})</p>

            <i
              onClick={() => {
                handleShowTaskInput("Doing");
              }}
            >
              <FaPlus />
            </i>
          </span>

          {Doing &&
            Doing.length > 0 &&
            Doing.map((item) => (
              <Task
                key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}

          <div
            className={styles["input-box"]}
            style={{ display: showTaskInput === "Doing" ? "flex" : "none" }}
          >
            <input
              className={styles["task-input"]}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="عنوان کار"
            />
            <div className={styles["input-box-footer"]}>
              <button
                className={styles["btn"]}
                onClick={() => handleAddTask("Doing")}
              >
                ذخیره
              </button>
              <button
                className={styles["cancel"]}
                onClick={() => handleShowTaskInput("")}
              >
                لغو
              </button>
            </div>
          </div>
        </div>

        <div className={styles["task"]}>
          <span>
            <p>Done ({Done.length})</p>
            <i
              onClick={() => {
                handleShowTaskInput("Done");
              }}
            >
              <FaPlus />
            </i>
          </span>

          {Done &&
            Done.length > 0 &&
            Done.map((item) => (
              <Task
                key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}

          <div
            className={styles["input-box"]}
            style={{ display: showTaskInput === "Done" ? "flex" : "none" }}
          >
            <input
              className={styles["task-input"]}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="عنوان کار"
            />
            <div className={styles["input-box-footer"]}>
              <button
                className={styles["btn"]}
                onClick={() => handleAddTask("Done")}
              >
                ذخیره
              </button>
              <button
                className={styles["cancel"]}
                onClick={() => handleShowTaskInput("")}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
