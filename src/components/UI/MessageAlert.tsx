import styles from './MessageAlert.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

interface MessageAlertProps {
    message: string,
    type: "success" | "error"
}


export default function MessageAlert({ message, type }: MessageAlertProps) {
    return (
        <div className={`${styles.messageContainer} ${type == 'success' ? styles.success : styles.error}`}>
            <div className={`${styles.icon} ${type === 'success' ? styles.successIcon : styles.errorIcon}`}>
                {type === 'success'
                    ? <FontAwesomeIcon icon={faCheck} />
                    : <FontAwesomeIcon icon={faExclamation} />
                }
            </div>
            <h1 className={styles.title} >{type == 'success' ? 'Success' : 'Error'}</h1>
            {message}
        </div>
    )
}