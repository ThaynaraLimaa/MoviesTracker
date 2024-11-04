import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.title}>Movies Tracker</p>
            <p className={styles.credits}>Designed and developed by <a href="https://github.com/thaynaralimaa" target='_blank'>Thaynara Lima</a></p>
        </footer>
    )
}