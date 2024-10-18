import React from "react";

const Modal = ({ showModal, task, onClose, onChange, onSubmit }) => {
  if (!showModal) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-2">Task Title:</label>
          <input
            type="text"
            value={task.title}
            onChange={onChange}
            className="w-full p-2 border rounded-md mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
