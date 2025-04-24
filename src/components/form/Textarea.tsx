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
}

function Textarea(props: TextareaProps) {
    const { field, fieldState: { error } } = useController(props);
    return (
        <label htmlFor={props.name}>
            {props.label}
            <textarea
                {...field}
                className={`${styles.textarea} ${error && styles.textareaInvalid}`}
                rows={props.rows}
                placeholder={props.label}
                id={props.name} />
            {error?.message && <p className='error'>{error.message}</p>}
        </label>
    )
}

export default Textarea