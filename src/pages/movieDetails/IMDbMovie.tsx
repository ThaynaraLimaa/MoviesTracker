import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './IMDbMovie.module.css';
import { deleteMovie, getOMDbMovie } from '../../service/fecthMovies';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

interface IMDbMovieProps {
    id: string
}

export default function IMDbMovie({ id }: IMDbMovieProps) {
    const navigate = useNavigate(); 

    // fetch from OMDb API
    const { data: movie, isLoading, isError, error } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getOMDbMovie(id)
    })

    const deleteMovieMutation = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => { navigate('/') }
    })

    const handleDeleteMovie = (id: string) => {
        if (confirm(`Are you sure you want to delete ${movie?.Title}`)) {
            deleteMovieMutation.mutate(id)
        }
    }

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <ErrorMessage name={error.name} message={error.message} />

    const genres = movie?.Genre.split(' ');

    return (
        <>
            <section className={styles.movieDetailsContainer}>
                <div className={styles.moviePost}>
                    <img src={movie?.Poster} alt={movie?.Title} className={styles.image} />
                    <div className={styles.buttonsContainer}>
                        <button className={styles.deleteBtn} aria-label='Delete' onClick={() => handleDeleteMovie(id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                <div className={styles.movieInformation}>
                    <div className={styles.movieInformationHeader}>
                        <h1 className={styles.title}>{movie?.Title}</h1>
                        <button><FontAwesomeIcon icon={faHeart} /></button>
                    </div>
                    <p className={styles.description}>{movie?.Plot}</p>
                    <ul className={styles.genreContainer}>
                        {genres?.map((genre) => (
                            <li key={genre} className={styles.genre}>{genre.replace(/,$/, '')}</li>
                        ))}
                    </ul>
                    <ul className={styles.detailsContainer}>
                        <li className={styles.details}><FontAwesomeIcon icon={faCalendar} /> {movie?.Released}</li>
                        <li className={styles.details}><FontAwesomeIcon icon={faClock} /> {movie?.Runtime}</li>
                        <li className={styles.details}><FontAwesomeIcon icon={faImdb} /> {movie?.imdbRating}<span>/10</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.movieCredits}>
                <div className={styles.creditContainer}>
                    <h2 className={styles.creditTitle}>Directors:</h2>
                    <p>{movie?.Director}</p>
                </div>
                <div className={styles.creditContainer}>
                    <h2 className={styles.creditTitle}>Writers:</h2>
                    <p>{movie?.Writer}</p>
                </div>
                <div className={styles.creditContainer}>
                    <h2 className={styles.creditTitle}>Actors:</h2>
                    <p>{movie?.Actors}</p>
                </div>
            </section>
        </>
    )
}