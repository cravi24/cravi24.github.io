import './index.scss';

const Gear = ({
  size = 100,
  teeth = 12,
  speed = 30,
  reverse = false,
  className = '',
  style = {},
}) => {
  const outerR = size / 2;
  const toothWidth = size * 0.075;
  const toothHeight = size * 0.13;
  const bodyR = outerR - toothHeight * 0.5;
  const innerHoleR = outerR * 0.36;
  const hubR = innerHoleR * 0.34;

  const teethArr = Array.from({ length: teeth }, (_, i) => i);
  const spokeAngles = [0, 60, 120];

  return (
    <svg
      className={`Gear ${className}`}
      style={{
        '--spin-duration': `${speed}s`,
        '--spin-direction': reverse ? 'reverse' : 'normal',
        ...style,
      }}
      viewBox={`${-outerR} ${-outerR} ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {teethArr.map((i) => {
        const angle = (i / teeth) * 360;
        return (
          <rect
            key={`t-${i}`}
            x={-toothWidth / 2}
            y={-outerR}
            width={toothWidth}
            height={toothHeight}
            transform={`rotate(${angle})`}
            fill="currentColor"
            rx={toothWidth * 0.18}
          />
        );
      })}
      <circle r={bodyR} fill="currentColor" />
      <circle r={innerHoleR} fill="var(--gear-cutout, #0a0e1a)" />
      {spokeAngles.map((a) => (
        <rect
          key={`s-${a}`}
          x={-bodyR * 0.07}
          y={-bodyR}
          width={bodyR * 0.14}
          height={bodyR * 2}
          transform={`rotate(${a})`}
          fill="currentColor"
        />
      ))}
      <circle r={hubR} fill="currentColor" />
      <circle r={hubR * 0.32} fill="var(--gear-cutout, #0a0e1a)" />
    </svg>
  );
};

export default Gear;
