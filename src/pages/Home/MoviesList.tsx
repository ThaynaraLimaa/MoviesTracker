import styles from './MoviesList.module.css'
import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../../service/fecthMovies'
import MovieCard from './MovieCard'
import ErrorMessage from '../../components/UI/ErrorMessage'

export default function MoviesList() {
    const { data: movies, error, isLoading, isError } = useQuery({
        queryKey: ['movies'],
        queryFn: getMovies
    })

    if (isLoading) return <h2>Loading...</h2>
    if (isError) {
        return (
            <ErrorMessage name={error.name} message={error.message}/>
        )
    }

    return (
        <div className={styles.movieListContainer}>
            {movies!.map(movie =>
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    url={movie.imageUrl}
                />
            )}
        </div>
    )
}