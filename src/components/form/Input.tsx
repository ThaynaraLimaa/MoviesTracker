import { forwardRef } from 'react'
import styles from './Input.module.css'

interface InputProps {
    label: string,
    type: "text" | "number" | "url" ,
    required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({label, type, required}, ref) => {
    return (
        <label className={styles.label}>
            {label}
            <input className={styles.input} type={type} required={required} ref={ref} placeholder={label}/>
        </label>
    )
})

export default Input