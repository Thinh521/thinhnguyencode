import { useState, useEffect } from "react";

const STORAGE_KEY = "viewedStories";

export default function useViewedStories() {
  const [viewedStories, setViewedStories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedStories));
  }, [viewedStories]);

  const markAsViewed = (id) => {
    setViewedStories((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isViewed = (id) => viewedStories.includes(id);

  return { viewedStories, markAsViewed, isViewed };
}
