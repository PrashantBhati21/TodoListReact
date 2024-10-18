import React from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TodosList = ({ list, onDelete, onEdit, onComplete }) => {
  return (
    <div className="px-4">
      <h1 className="mb-2 font-bold">Task List</h1>
      <ul>
        {list &&
          list.map((item) => {
            return (
              <li
                className="border-t p-2 flex justify-between gap-3"
                key={item.id} // Assuming each item has a unique id
              >
                <div>
                  <strong
                    className={
                      item.status === "Completed"
                        ? "line-through text-gray-500"
                        : ""
                    }
                  >
                    {item.title}
                  </strong>

                  <br />
                  <em className="border px-2 bg-blue-50 rounded-md">
                    {item.status}
                  </em>
                </div>

                <div className="flex gap-3 justify-end">
                  {item.status !== "completed" && (
                    <FaCheck
                      onClick={() => onComplete(item)}
                      className="text-green-500 cursor-pointer hover:text-green-700"
                    />
                  )}
                  <FaEdit
                    onClick={() => onEdit(item)}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  />
                  <FaTrash
                    onClick={() => onDelete(item)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TodosList;
