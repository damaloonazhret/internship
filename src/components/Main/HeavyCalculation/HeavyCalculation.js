import { useMemo } from "react";

const HeavyCalculation = ({ big }) => {
  const sum = (n) => {
    let arr = [];
    for (let i = 0; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  useMemo(() => sum(big), [big]);

  return (
    <article className="heavy">
      <p className="over">Page with heavy calculation</p>
    </article>
  );
};

export default HeavyCalculation;
