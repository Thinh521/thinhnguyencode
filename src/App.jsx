import CustomerRoutes from "./routes/CustomerRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen duration-200 overflow-hidden" style={{backgroundColor: "f5f5f5"}}>
        <CustomerRoutes />
      </div>
    </Router>
  );
}

export default App;
