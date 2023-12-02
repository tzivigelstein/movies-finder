import { useState } from "react";
import styles from "./index.module.css";
import { Type } from "../../types/movie";

const options = [
  { label: "All", value: "all" },
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episode", value: "episode" },
];

interface Props {
  handleTypeChange: (type: Type | null) => void;
}

export default function HorizontalPicker({ handleTypeChange }: Props) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    handleTypeChange(value as Type);
  };

  return (
    <div className={styles.picker}>
      {options.map(({ label, value }) => (
        <div
          key={value}
          className={`${styles.option} ${
            selectedOption === value && styles.selected
          }`}
          onClick={() => handleOptionClick(value)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
