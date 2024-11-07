import styles from './Textarea.module.css'
import { forwardRef } from "react";

interface TextareaProps {
    rows: number,
    label: string,
    id: string, 
    required?: boolean
}


const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({rows, label, id, required}: TextareaProps, ref) => {
    return (
        <label className={styles.label}>
            {label}
            <textarea className={styles.textarea} rows={rows} ref={ref} placeholder={label} id={id} required={required}></textarea>
        </label>
    )
})

export default Textarea