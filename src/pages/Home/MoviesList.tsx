import styles from './MoviesList.module.css'
import MovieCard from './MovieCard'
import { Movie } from '../../movieInterface'

interface MoviesListProps {
    movies: Movie[],
}

export default function MoviesList({ movies }: MoviesListProps) {
    return (
        <>
            <div className={styles.movieListContainer}>
                {movies!.map(movie =>
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        url={movie.imageUrl}
                    />
                )}
            </div>
        </>
    )
}