import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

interface MovieCardProps {
    title: string
    url: string,
}

export default function MovieCard({title, url}: MovieCardProps) {
    return (
        <div className={styles.movieCard}>
            <Link to='/'>
                <img src={url} alt={title} />
            </Link>
        </div>
    )
}