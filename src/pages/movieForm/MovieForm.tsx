import styles from './MovieForm.module.css'
import { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/UI/Button";
import Textarea from '../../components/form/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMovie, postMovie } from '../../service/fecthMovies';
import { useNavigate } from 'react-router-dom';
import MessageAlert from '../../components/UI/MessageAlert';
import { Movie } from '../../movieInterface';
import { SubmitHandler, useForm } from 'react-hook-form';
import MonthSelect from '../../components/form/MonthSelect';

export interface FormValues {
    MovieTitle: string
    ImgUrl: string,
    Descreption: string,
    Month: string,
    Year: number
}

interface MovieFormProps {
    movie?: Movie
}

export default function MovieForm({ movie }: MovieFormProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [showError, setshowError] = useState(false) // show or hide error dialog 

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            MovieTitle: movie?.title,
            ImgUrl: movie?.imageUrl,
            Descreption: movie?.description,
            Month: movie?.releaseDate.split(' ')[0],
            Year: movie && Number(movie?.releaseDate.split(' ')[1])
        }
    })

    const addMovieMutation = useMutation({
        mutationFn: postMovie,
        onSuccess: (data) => {
            // Invalidate movies, navigates to the new movie page and send the 'success' information to the page
            queryClient.invalidateQueries({ queryKey: ['movies'] })
            navigate(`/movie/${data.id}`, { state: { success: true } })
        },
        onError: () => {
            // shows error dialog if something went wrong
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
            // remove true state to hide the showError dialog
            setTimeout(() => {
                setshowError(false)
            }, 3000)
        }
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (movie) {
            editMovieMutation.mutate({
                title: data.MovieTitle,
                imageUrl: data.ImgUrl,
                description: data.Descreption,
                releaseDate: `${data.Month} ${data.Year}`,
                id: movie.id
            })
        } else {
            addMovieMutation.mutate({
                title: data.MovieTitle,
                imageUrl: data.ImgUrl,
                description: data.Descreption,
                releaseDate: `${data.Month} ${data.Year}`,
                id: `${Date.now()}`
            })
        }
    }
    
    return (
        <>
            <h2 className={styles.formTitle}>Add movie</h2>
            {showError && <MessageAlert type='error' message={`${movie ? editMovieMutation.error : addMovieMutation.error} `} />}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    control={control}
                    name='MovieTitle'
                    label='Movie Title'
                    type='text'
                    rules={{
                        required: 'Movie title is required',
                        minLength: { value: 2, message: 'Movie title must be at least 2 characters long.' }
                    }}
                />
                <Input
                    control={control}
                    name='ImgUrl'
                    label='Image URL'
                    type='url'
                    rules={{
                        required: 'Poster image URL is required',
                        validate: (value) => {
                            const isImage = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(value.toString());
                            return isImage || 'Please provide a valid image URL'
                        }
                    }}
                />
                <Textarea
                    control={control}
                    name='Descreption'
                    label='Description'
                    rows={10}
                    rules={{
                        required: 'Movie description is required',
                        minLength: { value: 25, message: 'Description must be at least 25 characters long.' }
                    }}
                />
                <div className={styles.releaseDateContainer}>
                    <MonthSelect
                        control={control}
                        name='Month'
                    />
                    <Input
                        control={control}
                        name='Year'
                        label='Year'
                        type='number'
                        rules={{
                            required: 'Release year is required',
                            validate: (value) => {
                                const currentYear = new Date().getFullYear()
                                if (Number(value) < 1895 || Number(value) > currentYear) {
                                    return `Year must be between 1895 and ${new Date().getFullYear()}`
                                }
                                return true
                            }
                        }}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <Button danger={true} handleClick={() => navigate(movie ? `/movie/${movie.id}` : '/')}>Cancel</Button>
                    <Button>Save</Button>
                </div>
            </form>
        </>
    )
}
