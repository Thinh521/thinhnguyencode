import React from "react";
import CustomerRoutes from "./routes/CustomerRoutes";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="bg-white text-black dark:bg-neutral-900 dark:text-white min-h-screen duration-200 overflow-hidden">
      <AnimatePresence mode="wait">
        <CustomerRoutes />
      </AnimatePresence>
    </div>
  );
}

export default App;
