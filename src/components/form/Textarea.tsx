import styles from './Textarea.module.css'
import { forwardRef } from "react";

interface TextareaProps {
    rows: number,
    label: string
}


const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({rows, label}: TextareaProps, ref) => {
    return (
        <label className={styles.label}>
            {label}
            <textarea className={styles.textarea} rows={rows} ref={ref} placeholder={label}></textarea>
        </label>
    )
})

export default Textarea