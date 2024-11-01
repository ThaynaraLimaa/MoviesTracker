import styles from './Header.module.css'
import Nav from './Nav';

export default function Header() {
    return (
        <header className={styles.header}>
            <Nav />
            <div className={styles.titleWrapper}>
                <h1 className={styles.headerTitle}>Movies Tracker</h1>
                <p>All your movies in one place.</p>
            </div>
        </header>
    )
}