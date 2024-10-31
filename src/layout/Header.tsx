import styles from './Header.module.css'
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <img src="public/images/logo.png" alt="Movies Tracker logo" />
                <ul>
                    <li>
                        <NavLink 
                        className={(isActive) => isActive ? `${styles.linkActive}` : ''}
                        to="/">Home</NavLink>
                        </li>
                    <li>About</li>
                </ul>
            </nav>
            <div className={styles.titleWrapper}>
                <h1>Movies Tracker</h1>
                <p>All your movies in one place.</p>
            </div>
        </header>
    )
}