import locale from "../../resources";


type AnimatedStripesProps = {
  ariaLabel?: string;
  ariaValueNow?: number;
  ariaValueMin?: number;
  ariaValueMax?: number;
  backgroundColor?: string;
};

const AnimatedStripes = ({
  ariaLabel = locale.loading,
  ariaValueNow = 50,
  ariaValueMin = 0,
  ariaValueMax = 100,
  backgroundColor = "bg-info",
}: AnimatedStripesProps) => {
  const width = `${ariaValueNow}%`;
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={ariaValueNow}
      aria-valuemin={ariaValueMin}
      aria-valuemax={ariaValueMax}
    >
      <div
        className={`progress-bar progress-bar-striped progress-bar-animated ${backgroundColor}`}
        style={{ width: width }}
      />
    </div>
  );
};

export default AnimatedStripes;
