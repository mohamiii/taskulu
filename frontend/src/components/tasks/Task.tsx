import React, { useState } from "react";
import styles from "./Task.module.css";
import TaskModal from "./modals/TaskModal";
import UserContextProvider from "@/store/user-context";

type Props = {
  task: Tasks;
  tasks: Tasks[];
  setTasks: (tasks: Tasks[]) => void;
};

export default function Task({ task, tasks, setTasks }: Props) {
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setTaskModalIsOpen(true);
        }}
        className={styles["task-box"]}
      >
        {task.title}
      </div>
      <UserContextProvider>
        <TaskModal
          open={taskModalIsOpen}
          onClose={() => {
            setTaskModalIsOpen(false);
          }}
          tasks={tasks}
          setTasks={setTasks}
          task={task}
        />
      </UserContextProvider>
    </>
  );
}
