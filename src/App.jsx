import { useEffect, useState } from "react";
import CustomerRoutes from "./routes/CustomerRoutes";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader loading={loading} text="Phúc Thịnh" />;
  }

  return (
    <div className="bg-white text-black dark:bg-neutral-900 dark:text-white min-h-screen duration-200 overflow-hidden">
      <CustomerRoutes />
    </div>
  );
}

export default App;
