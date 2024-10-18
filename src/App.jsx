import React from "react";
import Todo from "./todo/Todos";

const App = () => {
  return (
    <div>
      <div className="text-center font-bold py-4 border-b bg-slate-100">
        Todo Application
      </div>
      <Todo />
    </div>
  );
};

export default App;
