import styles from './Input.module.css'
import { useController, UseControllerProps } from 'react-hook-form'
import { FormValues } from '../../pages/movieForm/MovieForm'

interface InputProps extends UseControllerProps<FormValues> {
    label: string,
    type: "text" | "number" | "url",
}

function Input(props: InputProps) {
    const { field, fieldState: { error } } = useController(props)
    console.log(error)
    return (
        <label className={styles.label} htmlFor={props.name}>
            {props.label}
            <input
                {...field}
                className={`${styles.input} ${error && styles.inputInvalid}`}
                placeholder={props.label}
                id={props.name} type={props.type} />
            {error?.message && <p className='error'>{error.message}</p>}
        </label>
    )
}

export default Input