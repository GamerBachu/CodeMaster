import { useState, useEffect, memo } from "react";
import AnimatedStripes from "./AnimatedStripes";

const AppLoader = () => {
  const [loading, setLoading] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 10;
      });
    }, 10);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="app-loader">
      <AnimatedStripes
        ariaValueNow={loading}
        backgroundColor="bg-info"
      ></AnimatedStripes>
    </div>
  );
};

export default memo(AppLoader);
