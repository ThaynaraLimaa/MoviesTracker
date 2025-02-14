import styles from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface SearchProps {
    searchTerm: string | undefined,
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <form className={styles.searchContainer} onSubmit={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                <input type="search" className={styles.search} placeholder='Search' value={searchTerm} required
                    onChange={handleChange} />
            </form>
        </>
    )
}