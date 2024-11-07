import styles from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    return (
        <form className={styles.searchContainer}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}/>
            <input type="search" className={styles.search} placeholder='Search' required disabled/>
        </form>
    )
}