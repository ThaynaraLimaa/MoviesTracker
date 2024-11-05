import styles from './MovieForm.module.css'
import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/UI/Button";
import Textarea from '../../components/form/Textarea';
import MonthSelect from './MonthSelect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMovie } from '../../service/fecthMovies';
import { useNavigate } from 'react-router-dom';
import MessageAlert from '../../components/UI/MessageAlert';

export default function MovieForm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [showError, setshowError] = useState(false)

    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const releaseMonthRef = useRef<HTMLSelectElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    const { error, mutate } = useMutation({
        mutationFn: postMovie,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['movies'] })
            navigate(`/movie/${data.id}`, {state: {success: true}})
        },
        onError: () => {
            setshowError(true)
        }
    })

    useEffect(() => {
        if(showError) {
            setTimeout(() => {
                setshowError(false)
            }, 2000)
        }
    }, [showError])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate({
            title: titleRef!.current!.value,
            imageUrl: urlRef!.current!.value,
            description: descriptionRef!.current!.value,
            releaseDate: `${releaseMonthRef!.current!.value} ${releaseYearRef!.current!.value}`,
            id: `${Date.now()}`
        })

    }

    return (
        <>
            <h2>Add movie</h2>
            {showError && <MessageAlert type='error' message={`${error}`}/>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input label="Name" type="text" ref={titleRef} required={true} />
                <Input label="Image URL" type="url" ref={urlRef} required={true} />
                <Textarea rows={10} label='Description' ref={descriptionRef} />
                <div className={styles.releaseDateContainer}>
                    <MonthSelect ref={releaseMonthRef} />
                    <Input label='year' type='number' ref={releaseYearRef} required={true} />
                </div>
                <div className={styles.buttonsContainer}>
                    <Button danger={true}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </form>
        </>
    )
}