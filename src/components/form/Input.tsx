import styles from './Input.module.css'
import { useController, UseControllerProps } from 'react-hook-form'
import { FormValues } from '../../pages/movieForm/MovieForm'

interface InputProps extends UseControllerProps<FormValues> {
    label: string,
    type: "text" | "number" | "url",
    required?: boolean
}

function Input(props: InputProps) {
    const { field } = useController(props)
    return (
        <label className={styles.label} htmlFor={props.name}>
            {props.label}
            <input
                {...field}
                className={styles.input}
                placeholder={props.label}
                id={props.name} type={props.type}
                required={props.required || false} />
        </label>
    )
}

export default Input