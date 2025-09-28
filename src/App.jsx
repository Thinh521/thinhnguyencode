import { useEffect, useState } from "react";
import CustomerRoutes from "./routes/CustomerRoutes";
import Preloader from "./components/Preloader/Preloader";
import { Toaster } from "sonner";

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
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen duration-200 overflow-hidden">
      <CustomerRoutes />
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 backdrop-blur-md px-4 py-3",
            title: "font-medium text-sm",
            description: "text-xs text-neutral-600 dark:text-neutral-300",
          },
        }}
      />
    </div>
  );
}

export default App;
