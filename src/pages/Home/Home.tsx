import Button from '../../components/UI/Button'
import styles from './Home.module.css'
import MoviesList from './MoviesList'
import Search from './Search'

export default function Home() {
    const handleClick = () => {
        alert('This button is not ready yet')
    }
    return (
        <main>
            <Search />
            <div className={styles.moviesHeader}>
                <h2>My movies</h2>
                <Button handleClick={handleClick}>Add movie</Button>
            </div>
            <MoviesList />
        </main>
    )
}