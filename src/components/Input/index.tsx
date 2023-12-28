import styles from './index.module.css'
import { TimesIcon } from '../Icons'
import getRotativeValue from '../../utils'

interface Props {
  query: string
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeQueryFromInput(): void
  setNewQuery(newQuery: string): void
  loading: boolean
  loadingExtra: boolean
}

export default function Input({
  query,
  handleQueryChange,
  removeQueryFromInput,
  setNewQuery,
  loading,
  loadingExtra,
}: Props) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        <input
          value={query}
          name="query"
          type="text"
          placeholder="Search movies"
          onChange={handleQueryChange}
          onClick={event => event.currentTarget.setSelectionRange(-1, -1)}
        />
        {!!query && (
          <button
            onClick={removeQueryFromInput}
            className={styles.removeQueryButton}
          >
            <TimesIcon />
          </button>
        )}
      </div>
      <button
        onClick={() => {
          if (loading || loadingExtra) return
          setNewQuery(getRotativeValue())
        }}
        className={styles.randomMovie}
      >
        Random
      </button>
    </div>
  )
}
