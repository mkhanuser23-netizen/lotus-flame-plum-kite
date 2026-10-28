import { useEffect, useState } from "react";

export function useWeekday() {
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    setDay(new Date().getDay());
  }, []);
  return day;
}

export function useDaypart() {
  const [part, setPart] = useState<"morning" | "afternoon" | "evening" | null>(null);
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setDay(now.getDay());
    setPart(hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening");
  }, []);
  return { part, day };
}
