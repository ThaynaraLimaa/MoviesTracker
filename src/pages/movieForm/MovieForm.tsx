import styles from './MovieForm.module.css'
import IMDbIdForm from './IMDbIdForm'; 

import ManuallyForm from "./ManuallyForm";

export default function MovieForm() {
    return (
        <>
            <h1 className={styles.pageTitle}>Add movie</h1>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Add movie by IMDb ID</h2>
                <IMDbIdForm />
            </section>
            <p className={styles.division}><span>or</span></p>
            <section className={styles.section}>
                <h2>Add Manually</h2>
                <ManuallyForm />
            </section>
        </>
    )
}