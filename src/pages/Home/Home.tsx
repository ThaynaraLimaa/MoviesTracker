import { useMemo, useState } from 'react'
import LinkButton from '../../components/UI/LinkButton'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Search from './Search'
import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../../service/fecthMovies'
import ErrorMessage from '../../components/UI/ErrorMessage'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data: movies, error, isLoading, isError } = useQuery({
        queryKey: ['movies'],
        queryFn: getMovies
    })

    const filteredMovies = useMemo(() => {
        if(!movies) return []; 

        return movies.filter(movies => {
            return (searchTerm === '' || movies.title.toLowerCase().includes(searchTerm.toLowerCase()))
        })
    }, [searchTerm, movies])


    return (
        <>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className={styles.moviesHeader}>
                <h2>My movies</h2>
                <LinkButton to='/addMovie' role='secondary'>Add movie</LinkButton>
            </div>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : isError ? (
                <ErrorMessage name={error.name} message={error.message} />
            ) : filteredMovies && filteredMovies.length >= 1 ? (
                <MoviesList movies={filteredMovies!} />
            ) : (
                searchTerm ? (
                    <div>No movies found...</div>
                ) : (
                    <div className={styles.noMovieContainer}>
                        <h2>No mvoies in here..</h2>
                        <p>Let's add a new movie to your collection!</p>
                        <LinkButton to='/addMovie' role='primary'>Add movie</LinkButton>
                    </div>
                )
            )}
        </>
    )
}