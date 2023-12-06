import { useState } from 'react'
import styles from './index.module.css'
import { Type } from '../../types/movie'

const options: { label: string; value: Type }[] = [
  { label: 'All', value: '' },
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episodes', value: 'episode' },
  { label: 'Games', value: 'game' },
]

interface Props {
  type: Type | null
  handleTypeChange: (type: Type | null) => void
}

export default function HorizontalPicker({ type, handleTypeChange }: Props) {
  const [selectedOption, setSelectedOption] = useState<Type>(
    type ?? options[0].value,
  )

  const handleOptionClick = (value: Type) => {
    setSelectedOption(value)
    handleTypeChange(value as Type)
  }

  return (
    <div className={styles.picker}>
      {options.map(({ label, value }) => (
        <button
          key={value}
          className={`${styles.option} ${
            selectedOption === value ? styles.selected : ''
          } ${
            value === '' && selectedOption !== value ? styles.defaultOption : ''
          }`}
          onClick={() => handleOptionClick(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
