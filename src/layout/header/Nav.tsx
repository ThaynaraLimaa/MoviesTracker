import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <img src="public/images/Primary-Logo.png" alt="Movies Tracker logo" />
            <ul className={styles.ul}>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? `${styles.linkActive}` : ''}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/addMovie' className={({ isActive }) => isActive ? `${styles.linkActive}` : ''}>Add movie</NavLink>
                </li>
                <li>
                    <NavLink to='/favorites' className={({ isActive }) => isActive ? `${styles.heartActive}` : ''}><span aria-label='favorites'><FontAwesomeIcon icon={faHeart}/></span></NavLink>
                </li>
            </ul>
        </nav>
    )
}