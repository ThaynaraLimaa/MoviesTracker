import { ChangeEvent } from 'react'
import styles from './Input.module.css'

interface InputProps {
    label: string,
    type: "text" | "number" | "url" | "search",
    id: string
    disabled: boolean,
    invalid: boolean, 
    value: string,
    handleChange: (e:ChangeEvent) => void 
}

export default function Input({label, type, id, disabled, invalid, value, handleChange}: InputProps) {
    return (
            <div className={styles.inputContainer}>
                <label htmlFor={id} className={styles.label}>{label}</label>
                <input className={styles.input}
                    type={type}
                    id={id}
                    disabled= {disabled}
                    value={value}
                    onChange={handleChange}
                />
            </div>
    )
}