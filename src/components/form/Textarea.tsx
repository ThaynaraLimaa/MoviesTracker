import { useController, UseControllerProps } from 'react-hook-form';
import styles from './Textarea.module.css'
import { forwardRef } from "react";
import { FormValues } from '../../pages/movieForm/MovieForm';

// interface TextareaProps {
//     rows: number,
//     label: string,
//     id: string, 
//     required?: boolean
// }

interface TextareaProps extends UseControllerProps<FormValues> {
    rows: number,
    label: string,
    required?: boolean
}

function Textarea(props: TextareaProps) {
    const { field } = useController(props)
    return (
        <label htmlFor={props.name}>
            {props.label}
            <textarea
                {...field}
                className={styles.textarea}
                rows={props.rows}
                placeholder={props.label}
                id={props.name}
                required={props.required || false} />
        </label>
    )
}

// const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ rows, label, id, required }: TextareaProps, ref) => {
//     return (
//         <label className={styles.label}>
//             {label}
//             <textarea className={styles.textarea} rows={rows} ref={ref} placeholder={label} id={id} required={required}></textarea>
//         </label>
//     )
// })

export default Textarea