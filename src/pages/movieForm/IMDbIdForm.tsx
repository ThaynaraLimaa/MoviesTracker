import styles from './IMDbIdForm.module.css'
import Button from '../../components/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { postMovie } from '../../service/fecthMovies'
import { IMDbApiResponse } from '../../movieInterface'
import MessageAlert from '../../components/UI/MessageAlert'
import { useNavigate } from 'react-router-dom'

export interface IMDbFormValues {
    IMDbId: string
}

export default function IMDbIdForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IMDbFormValues>();
    const queryClient = useQueryClient();
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [showError, setShowError] = useState<string | null>(null)
    const navigate = useNavigate();

    const addIMDbMovieMutation = useMutation({
        mutationFn: postMovie,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['movies'] }),
                navigate(`/movie/${data.id}`, { state: { success: true } })
        },
        onError: (erro) => {
            setShowError(erro.message)
        }
    })

    // remove error pop-up after 4 seconds
    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(null)
            }, 4000)
        }
    }, [showError])

    const onSubmit: SubmitHandler<IMDbFormValues> = async (data) => {
        try {
            const api = await fetch(`http://www.omdbapi.com/?apikey=706c99d8&i=${data.IMDbId}`)
            if (!api.ok) {
                throw new Error("Failed to fetch movie data.");
            }

            const movie: IMDbApiResponse = await api.json()

            // Checks if exist a movie with the provided id
            if (movie.Response == 'False') {
                setFetchError('No movie found with the provided IMDb ID.')
                return
            }

            // add movie to json-server
            addIMDbMovieMutation.mutate({
                id: data.IMDbId,
                title: movie.Title,
                imageUrl: movie.Poster
            })

        } catch (e) {
            setShowError('Failed to fetch movie')
        }
    }

    return (
        <>
            {typeof showError == 'string' && <MessageAlert type='error' message={showError} />}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label className={styles.label}>
                    IMDb ID
                    <input
                        className={styles.input}
                        {...register("IMDbId", {
                            required: 'IMDb ID is required',
                            validate: (value) => {
                                const validation = /^tt\d{7,9}$/.test(value)
                                return validation || 'Invalid IMDb ID'
                            }
                        })}
                    />
                </label>
                {errors.IMDbId ? (
                    <p className={`error ${styles.erroMessage}`}>{errors.IMDbId.message}</p>
                ) : fetchError ? (
                    <p className={`error ${styles.erroMessage}`}>{fetchError}</p>
                ) : null}
                <Button disabled={isSubmitting}>{isSubmitting ? 'submiting..' : 'Add movie'}</Button>
            </form>
        </>
    )
}