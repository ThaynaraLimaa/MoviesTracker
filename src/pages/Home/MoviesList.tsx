import MovieCard from './MovieCard'
import styles from './MoviesList.module.css'

export default function MoviesList() {
    
    return (
        <div className={styles.movieListContainer}>
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
            <MovieCard url='https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg' name='Avengers Endgame'/> 
        </div>
    )
}