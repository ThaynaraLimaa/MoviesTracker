import styles from './MonthsSelect.module.css'

import { forwardRef } from "react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const MonthSelect = forwardRef<HTMLSelectElement>(({}, ref) => {
    return (
        <label className={styles.label}>
            Month
            <select className={styles.select} ref={ref} id='month'>
            {months.map(month =>
                <option key={month} value={month}>{month}</option>
            )}
        </select>
        </label>
    )
})

export default MonthSelect