import styles from './MovieForm.module.css'
import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/UI/Button";
import Textarea from '../../components/form/Textarea';
import MonthSelect from './MonthSelect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMovie, postMovie } from '../../service/fecthMovies';
import { useNavigate } from 'react-router-dom';
import MessageAlert from '../../components/UI/MessageAlert';
import { Movie } from '../../movieInterface';

interface MovieFormProps {
    movie?: Movie
}

export default function MovieForm({ movie }: MovieFormProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [showError, setshowError] = useState(false)

    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const releaseMonthRef = useRef<HTMLSelectElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (movie) {
            const refs = [
                { ref: titleRef, value: movie.title },
                { ref: urlRef, value: movie.imageUrl },
                { ref: descriptionRef, value: movie.description },
                { ref: releaseMonthRef, value: movie.releaseDate.split(' ')[0] },
                { ref: releaseYearRef, value: movie.releaseDate.split(' ')[1] },
            ]

            refs.forEach(({ ref, value }) => {
                if (ref.current) {
                    ref.current.value = value
                }
            })
        }

    }, [movie])


    const addMovieMutation = useMutation({
        mutationFn: postMovie,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['movies'] })
            navigate(`/movie/${data.id}`, { state: { success: true } })
        },
        onError: () => {
            setshowError(true)
        }
    })

    const editMovieMutation = useMutation({
        mutationFn: editMovie,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['movies'] })
            navigate(`/movie/${data.id}`, { state: { success: true } })
        },
        onError: () => {
            setshowError(true)
        }
    })

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setshowError(false)
            }, 3000)
        }
    }, [showError])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (movie) {
            editMovieMutation.mutate({
                title: titleRef!.current!.value,
                imageUrl: urlRef!.current!.value,
                description: descriptionRef!.current!.value,
                releaseDate: `${releaseMonthRef!.current!.value} ${releaseYearRef!.current!.value}`,
                id: movie.id
            })
        } else {
            addMovieMutation.mutate({
                title: titleRef!.current!.value,
                imageUrl: urlRef!.current!.value,
                description: descriptionRef!.current!.value,
                releaseDate: `${releaseMonthRef!.current!.value} ${releaseYearRef!.current!.value}`,
                id: `${Date.now()}`
            })
        }
    }

    return (
        <>
            <h2>Add movie</h2>
            {showError && <MessageAlert type='error' message={`${movie ? editMovieMutation.error : addMovieMutation.error}`} />}
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input label="Name" type="text" ref={titleRef} required={true} />
                <Input label="Image URL" type="url" ref={urlRef} required={true} />
                <Textarea rows={10} label='Description' ref={descriptionRef} />
                <div className={styles.releaseDateContainer}>
                    <MonthSelect ref={releaseMonthRef} />
                    <Input label='year' type='number' ref={releaseYearRef} required={true} />
                </div>
                <div className={styles.buttonsContainer}>
                    <Button danger={true} handleClick={() => navigate(movie ? `/movie/${movie.id}` : '/')}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </form>
        </>
    )
}