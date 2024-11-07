import styles from './Textarea.module.css'
import { forwardRef } from "react";

interface TextareaProps {
    rows: number,
    label: string,
    id: string
}


const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({rows, label, id}: TextareaProps, ref) => {
    return (
        <label className={styles.label}>
            {label}
            <textarea className={styles.textarea} rows={rows} ref={ref} placeholder={label} id={id}></textarea>
        </label>
    )
})

export default Textarea