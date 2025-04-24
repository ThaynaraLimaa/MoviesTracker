import LinkButton from '../../components/UI/LinkButton';
import Header from '../../layout/header/Header';
import styles from './NotFound.module.css'

export default function NotFound() {
    return (
        <div className={styles.notFoundPage}>
        <Header />
        <main className={styles.notFoundContainer}>
            <h1>Oops</h1>
            <p className={styles.heading3}>I couldn’t find the page you are looking for....</p>
            <p className={styles.heading5}>But don’t worry, I can take you back home!</p>
            <LinkButton to='/' role='primary'>Go back home</LinkButton>
        </main>
        </div>
    )
}