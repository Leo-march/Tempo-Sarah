"use client";
import React, { useEffect, useState } from "react";

function diff(start: Date, now: Date) {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function TimeTogether({ startDate }: { startDate: string }) {
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // only set time after mount to avoid SSR/client mismatch
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !now) {
    // render a stable placeholder until hydrated
    return (
      <div className="time-together">
        <div className="time-row">
          <div>
            <strong>--</strong>
            <div>anos</div>
          </div>
          <div>
            <strong>--</strong>
            <div>meses</div>
          </div>
          <div>
            <strong>--</strong>
            <div>dias</div>
          </div>
        </div>
        <div className="time-row small">
          <div>--:</div>
          <div>--:</div>
          <div>--</div>
        </div>
      </div>
    );
  }

  const diffObj = diff(new Date(startDate), now);

  return (
    <div className="time-together">
      <div className="time-row">
        <div>
          <strong>{diffObj.years}</strong>
          <div>anos</div>
        </div>
        <div>
          <strong>{diffObj.months}</strong>
          <div>meses</div>
        </div>
        <div>
          <strong>{diffObj.days}</strong>
          <div>dias</div>
        </div>
      </div>
      <div className="time-row small">
        <div>{String(diffObj.hours).padStart(2, "0")}:</div>
        <div>{String(diffObj.minutes).padStart(2, "0")}:</div>
        <div>{String(diffObj.seconds).padStart(2, "0")}</div>
      </div>
    </div>
  );
}
