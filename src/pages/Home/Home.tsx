import { useMemo, useState } from 'react'
import LinkButton from '../../components/UI/LinkButton'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Search from './Search'
import { useQuery } from '@tanstack/react-query'
import { getMoviesPagination } from '../../service/fecthMovies'
import ErrorMessage from '../../components/UI/ErrorMessage'
import Pagination from '../../components/UI/Pagination'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState(1);
    const MOVIES_PER_PAGE = 18

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['movies', page],
        queryFn: () => getMoviesPagination(page, MOVIES_PER_PAGE)
    });


    const filteredMovies = useMemo(() => {
        if (!data) return [];

        return data.movies.filter(movies => {
            return (searchTerm === '' || movies.title.toLowerCase().includes(searchTerm.toLowerCase()))
        })
    }, [searchTerm, data?.movies])

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
                <div className={styles.moviesContainer}>
                    <MoviesList movies={filteredMovies!} />
                    <Pagination currentPage={page} hasNext={data!.hasMore} onChangePage={setPage} />
                </div>

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