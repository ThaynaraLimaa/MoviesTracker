import styles from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface SearchProps {
    setSearchTerm: Dispatch<SetStateAction<string | undefined>>
}

export default function Search({ setSearchTerm }: SearchProps) {
    const [searchText, setSearchText] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSearchTerm(searchText)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        if (e.target.value == '') {
            setSearchTerm('')
        }
    }

    return (
        <>
            <form className={styles.searchContainer} onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                <input type="search" className={styles.search} placeholder='Search' value={searchText} required
                    onChange={handleChange} />
            </form>
        </>
    )
}