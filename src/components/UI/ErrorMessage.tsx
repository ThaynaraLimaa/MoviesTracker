import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
    name: string, 
    message: string
}

export default function ErrorMessage({name, message} : ErrorMessageProps) {
    return (
        <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>{name}</h2>
            <p className={styles.errorMessage}>{message}</p>
        </div>
    )
}