import React from "react";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <div className="bg-white text-black dark:bg-neutral-900 dark:text-white min-h-screen duration-200 overflow-hidden">
      <CustomerRoutes />
    </div>
  );
}

export default App;
