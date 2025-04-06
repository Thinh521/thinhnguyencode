import React from "react";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <div
      className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen duration-200 overflow-hidden"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <CustomerRoutes />
    </div>
  );
}

export default App;
