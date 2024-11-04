import styles from './MovieForm.module.css'
import { FormEvent, useRef } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/UI/Button";
import Textarea from '../../components/form/Textarea';
import MonthSelect from './MonthSelect';

export default function MovieForm() {
    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const releaseMonthRef = useRef<HTMLSelectElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(titleRef!.current!.value)
        console.log(urlRef!.current!.value)
        console.log(descriptionRef!.current!.value)
        console.log(releaseMonthRef!.current!.value)
        console.log(releaseYearRef!.current!.value)
    }

    return (
        <>
            <h2>Add movie</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input label="Name" type="text" ref={titleRef} required={true}/>
                <Input label="Image URL" type="url" ref={urlRef} required={true}/>
                <Textarea rows={10} label='Description' ref={descriptionRef} />
                <div className={styles.releaseDateContainer}>
                    <MonthSelect ref={releaseMonthRef}/>
                    <Input label='year' type='number' ref={releaseYearRef} required={true}/>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button danger={true}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </form>
        </>
    )
}