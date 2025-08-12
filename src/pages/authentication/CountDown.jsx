/* eslint-disable react/prop-types */
import { useEffect } from "react";

const CountDown = ({ isActive, setIsActive, seconds, setSeconds }) => {
  // Start the countdown when `isActive` is true
  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1); // decrease seconds by 1
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false); // stop the countdown when it reaches 0
    }

    return () => clearInterval(timer); // clear timer on cleanup
  }, [isActive, seconds]);

  // Convert seconds into MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <span className="countdown inline-block align-middle">
      <p className="text-[13px] text-[#0e1014] font-bold inline">
        {formattedTime}
      </p>
    </span>
  );
};

export default CountDown;
