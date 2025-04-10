import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/UI/ErrorMessage';
import styles from './ManuallyMovie.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteMovie, getMovie } from '../../service/fecthMovies';
import FavoriteButton from '../favorites/FavoriteButton';

interface ManuallyMovieProps {
    id: string
}

export default function ManuallyMovie({ id }: ManuallyMovieProps) {
    const navigate = useNavigate()

    // Fetch movie from json-server
    const { data: movie, error, isLoading, isError } = useQuery({
        queryKey: ['movies', id],
        queryFn: () => getMovie(id)
    })

    const deleteMovieMutation = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => { navigate('/') }
    })

    const handleDeleteMovie = (id: string) => {
        if (confirm(`Are you sure you want to delete ${movie?.title}`)) {
            deleteMovieMutation.mutate(id)
        }
    }

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <ErrorMessage name={error.name} message={error.message} />

    return (
        <>
            <div className={styles.movieDetailsContainer}>
                <div className={styles.moviePost}>
                    <img src={movie?.imageUrl} alt={movie?.title} className={styles.image} />
                    <div className={styles.buttonsContainer}>
                        <Link to={`/editMovie/${movie!.id}`} className={styles.editBtn} aria-label='Edit'>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>

                        <button className={styles.deleteBtn} aria-label='Delete' onClick={() => handleDeleteMovie(movie!.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                <div className={styles.movieInformation}>
                    <div className={styles.movieInformationHeader}>
                        <h1 className={styles.title}>{movie?.title}</h1>
                        <FavoriteButton movie={movie!} isFavorite={movie?.favorite || false} queryKeyName='movies'/>
                    </div>
                    <p className={styles.description}>{movie?.description}</p>
                    <p className={styles.releaseData}> <FontAwesomeIcon icon={faCalendarDays} /> {movie?.releaseDate}</p>
                </div>
            </div>
        </>
    )
}