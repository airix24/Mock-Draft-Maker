import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ContestCountdown.css";

const ContestCountdown = (props) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await axios.get(
          "https://worldtimeapi.org/api/timezone/America/Chicago"
        );
        const { datetime } = response.data;
        const targetDate = props.closeTime;
        const currentDate = new Date(datetime);

        const diff = targetDate.getTime() - currentDate.getTime();

        if (diff > 0) {
          const seconds = Math.floor(diff / 1000) % 60;
          const minutes = Math.floor(diff / (1000 * 60)) % 60;
          const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));

          setCountdown({ days, hours, minutes, seconds });
        }
        setLoading(false);

        if (diff > 0) {
          props.setIsContestClosed(false);
        }

      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };

    const intervalId = setInterval(fetchCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {countdown.days <= 0 && countdown.hours <= 0 && countdown.minutes <= 0 && countdown.seconds <= 0 ? (
        <p className="contest-is-live-p">Contest is live.</p>
      ) : (
        <div className="contest-countdown">
          <h2>Contest closes in:</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <span>
                {countdown.days} day{countdown.days === 1 ? "" : "s"}
              </span>
              <span>
                {countdown.hours} hour{countdown.hours === 1 ? "" : "s"}
              </span>
              <span>
                {countdown.minutes} minute{countdown.minutes === 1 ? "" : "s"}
              </span>
              <span>
                {countdown.seconds} second{countdown.seconds === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
      )}
      </div>
  );
};

export default ContestCountdown;
