import React, { useEffect, useState } from "react";
import TodosForm from "./TodosForm";
import TodosList from "./TodosList";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const initialTask = {
    title: "",
    description: "",
    id: uuidv4(),
    status: "todo",
  };

  const [task, setTask] = useState(initialTask);
  const [editTask, setEditTask] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleOnTaskChange = (e) => {
    const { value } = e.target;
    setTask({ ...task, title: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Task title can't be empty! 🤷‍♂️");
      return;
    }

    if (editTask) {
      // Edit existing task
      const updatedTodoList = todoList.map((item) =>
        item.id === task.id ? task : item
      );
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
      setEditTask(false);
    } else {
      // Add new task
      const newTodoList = [...todoList, { ...task, id: uuidv4() }];
      setTodoList(newTodoList);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }

    // Reset task form after submission
    setTask(initialTask);
  };

  const handleOnDelete = (item) => {
    const filteredItems = todoList.filter((task) => task.id !== item.id);
    setTodoList(filteredItems);
    localStorage.setItem("todoList", JSON.stringify(filteredItems));
  };

  const handleOnEdit = (item) => {
    setEditTask(true);
    setTask(item);
    setShowModal(true); // Open the modal when editing a task
  };

  const handleOnComplete = (task) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === task.id ? { ...item, status: "Completed" } : item
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setEditTask(false);
    setTask(initialTask); // Reset task to initial state if canceled
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    // Update the task in the list
    const updatedTodoList = todoList.map((item) =>
      item.id === task.id ? task : item
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

    setShowModal(false); // Close modal after saving
    setEditTask(false);
    setTask(initialTask); // Reset form after submission
  };

  useEffect(() => {
    const todoListLS = localStorage.getItem("todoList");
    if (todoListLS) {
      const todoListLSArr = JSON.parse(todoListLS);
      setTodoList(todoListLSArr);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="w-full max-w-lg p-5 bg-white rounded-lg shadow-lg">
        {/* Task Form */}
        <TodosForm
          onSubmit={handleOnSubmit}
          task={task}
          onChange={handleOnTaskChange}
          buttonText={editTask ? "Edit Task" : "Add Task"}
        />

        {/* Task List */}
        <div className="mt-4 max-h-[40vh] overflow-y-auto w-full">
          <TodosList
            list={todoList}
            onDelete={handleOnDelete}
            onEdit={handleOnEdit}
            onComplete={handleOnComplete}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        showModal={showModal}
        task={task}
        onClose={handleCloseModal}
        onChange={handleOnTaskChange}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Todos;
