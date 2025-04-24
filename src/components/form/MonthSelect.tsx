import { useController, UseControllerProps } from 'react-hook-form';
import styles from './MonthsSelect.module.css'
import { FormValues } from '../../pages/movieForm/MovieForm';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function MonthSelect(props: UseControllerProps<FormValues>) {
    const { field } = useController(props)
    return (
        <label className={styles.label} htmlFor={props.name}>
            Month
            <select {...field} className={styles.select} id={props.name}>
                {months.map(month =>
                    <option key={month} value={month} >{month}</option>
                )}
            </select>
        </label>
    )
}


export default MonthSelect