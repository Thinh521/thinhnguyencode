import { useState, useEffect } from "react";

export default function useViewedStories() {
  const [viewedStories, setViewedStories] = useState(() => {
    const stored = localStorage.getItem("viewedStories");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("viewedStories", JSON.stringify(viewedStories));
  }, [viewedStories]);

  const markAsViewed = (id) => {
    setViewedStories((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isViewed = (id) => viewedStories.includes(id);

  return { viewedStories, markAsViewed, isViewed };
}
