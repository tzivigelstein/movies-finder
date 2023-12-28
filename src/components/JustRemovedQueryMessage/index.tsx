import styles from './index.module.css'
import useExampleMovie from '../../hooks/useExampleMovie'

interface Props {
  setNewQuery(newQuery: string): void
}

export default function JustRemovedQueryMessage({ setNewQuery }: Props) {
  const { exampleMovie } = useExampleMovie()

  return (
    <button
      onClick={() => setNewQuery(exampleMovie)}
      className={styles.examplesButton}
    >
      <p className={styles.examplesHelper}>
        Try searching for <span>{exampleMovie}</span>
      </p>
    </button>
  )
}
