import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

interface MovieCardProps {
    name: string
    url: string,
    // movieId: number
}

export default function MovieCard({name, url}: MovieCardProps) {
    return (
        <div className={styles.movieCard}>
            <Link to='/'>
                <img src={url} alt={name} />
            </Link>
        </div>
    )
}