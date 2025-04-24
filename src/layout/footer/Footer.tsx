import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <img src="public/images/Primary-Logo.png" alt="Movies Tracker logo" />
            <div className={styles.text}>
                <p className={styles.credits}>Designed and developed by <a href="https://thaynaralimadev.vercel.app/" target='_blank'>Thaynara Lima</a></p>
                <p className={styles.copy}>© 2025 Movies Tracker</p>
            </div>
        </footer>
    )
}