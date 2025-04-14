import styles from './Favorites.module.css'
import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../../service/fecthMovies"
import { useMemo } from "react"
import MoviesList from '../Home/MoviesList'
import ErrorMessage from "../../components/UI/ErrorMessage"

export default function Favorites() {
    const { data: movies, error, isLoading, isError } = useQuery({
        queryKey: ['movies'],
        queryFn: getMovies
    })

    const favoriteMovies = useMemo(() => {
        if (!movies) return [];

        return movies?.filter(movies => {
            return movies.favorite == true
        })
    }, [movies])

    return (
        <>
            <h1 className={styles.pageTitle}>My Favorite Movies</h1>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : isError ? (
                <ErrorMessage name={error.name} message={error.message} />
            ) : favoriteMovies && favoriteMovies.length >= 1 ? (
                <MoviesList movies={favoriteMovies!} />
            ) : (
                <p className={styles.noMovies}>No favorite movies in here...</p>
            )
            }
        </>
    )
}
