import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

interface MovieCardProps {
    title: string
    url: string,
    id: string
}

export default function MovieCard({title, url, id}: MovieCardProps) {
    return (
        <div className={styles.movieCard}>
            <Link to={`/movie/${id}`}>
                <img src={url} alt={title} />
            </Link>
        </div>
    )
}