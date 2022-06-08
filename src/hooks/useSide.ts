import { useState } from "react";

const useSide = () => {
  const [side, setSide] = useState(3);

  const handleChange = (e: any) => {
    const change = e.target.value;
    if (change > 2 && 8 > change) {
      setSide(e.target.value);
    }
  }
  return [side, { handleChange }] as const;
}

export default useSide;