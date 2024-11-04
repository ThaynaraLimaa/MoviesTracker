import LinkButton from '../../components/UI/LinkButton'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Search from './Search'

export default function Home() {
   
    return (
        <>
            <Search />
            <div className={styles.moviesHeader}>
                <h2>My movies</h2>
                <LinkButton to='/addMovie'>Add movie</LinkButton>
            </div>
            <MoviesList />
        </>
    )
}