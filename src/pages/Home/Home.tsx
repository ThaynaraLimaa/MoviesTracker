import { useState } from 'react'
import LinkButton from '../../components/UI/LinkButton'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Search from './Search'
import { useQuery } from '@tanstack/react-query'
import { getMovies, searchMovie } from '../../service/fecthMovies'
import ErrorMessage from '../../components/UI/ErrorMessage'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>()
    const key = searchTerm ? ['movies', searchTerm] : ['movies']
    const fun = searchTerm ? () => searchMovie(searchTerm) : getMovies

    const { data: movies, error, isLoading, isError } = useQuery({
        queryKey: key,
        queryFn: fun
    })
    
    return (
        <>
            <Search setSearchTerm={setSearchTerm} />
            <div className={styles.moviesHeader}>
                <h2>My movies</h2>
                <LinkButton to='/addMovie'>Add movie</LinkButton>
            </div>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : isError ? (
                <ErrorMessage name={error.name} message={error.message} />
            ) : movies && movies.length >= 1 ? (
                <MoviesList movies={movies!} />
            ) : (
                searchTerm ? (
                    <div>No movies found...</div>
                ) : (
                    <div className={styles.noMovieContainer}>
                        <h2>No mvoies in here..</h2>
                        <p>Let's add a new movie to your collection!</p>
                        <LinkButton to='/addMovie'>Add movie</LinkButton>
                    </div>
                )
            )}
        </>
    )
}