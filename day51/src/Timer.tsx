import React, { useState } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  return (
    <div>
      <h2>타이머 : {time.toLocaleTimeString()}</h2>
      <button
        onClick={() => {
          setInterval(() => {
            setTime(new Date());
          }, 1000);
        }}
      >
        시작
      </button>
    </div>
  );
};

export default Timer;
