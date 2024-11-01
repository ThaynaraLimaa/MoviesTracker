import styles from './NotFound.module.css'
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className={styles.notFoundContainer}>
            <h1>404 - Not Found</h1>
            <p>Ops, we can't find the page you are looking for :(</p>
            <Link to='/' className={styles.link}>Go back home</Link>
        </main>
    )
}