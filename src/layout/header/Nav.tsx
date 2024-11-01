import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <img src="public/images/logo.png" alt="Movies Tracker logo" />
            <ul className={styles.ul}>
                <li>
                    <NavLink
                        className={(isActive) => isActive ? `${styles.linkActive}` : ''}
                        to="/">Home</NavLink>
                </li>
                <li>About</li>
            </ul>
        </nav>
    )
}