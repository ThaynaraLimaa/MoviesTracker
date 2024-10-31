import { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    children: ReactNode,
    handleClick: () => void
    danger?: boolean
    disabled?: boolean
}

export default function Button({children, danger, disabled, handleClick}: ButtonProps) {

    if(danger) {
        return (
            <button className={`${styles.button} ${styles.dangerButton}`}
                disabled={disabled || false}
                onClick={handleClick}
            >
                {children}
            </button>
        )
    }

    return (
        <button className={`${styles.button} ${styles.standardBtn}`}
            disabled={disabled || false}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}