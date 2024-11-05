import styles from './MovieDetails.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../../service/fecthMovies';
import ErrorMessage from '../../components/UI/ErrorMessage';
import MessageAlert from '../../components/UI/MessageAlert';
import { useEffect, useState } from 'react';


export default function MovieDetails() {
    const location = useLocation(); 
    const success = location.state ? location.state.success : false
    const [showMessage, setShowMessage] = useState<boolean>(success)
    const { id } = useParams();

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setShowMessage(false)
            }, 2000)
        } else {
            setShowMessage(false)
        }
    })

    const { data: movie, error, isLoading, isError } = useQuery({
        queryKey: ['movies', id],
        queryFn: () => getMovie(id as string)
    })

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <ErrorMessage name={error.name} message={error.message} />

    return (
        <>
        {showMessage && <MessageAlert type='success' message='Testing'/>}
            <div className={styles.movieDetailsContainer}>
            <div className={styles.left}>
                <img src={movie?.imageUrl} alt={movie?.title} className={styles.image} />
                <div className={styles.buttonsContainer}>
                    <button className={styles.editBtn} aria-label='Edit'><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button className={styles.deleteBtn} aria-label='Delete'><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{movie?.title}</h1>
                <p className={styles.description}>{movie?.description}</p>
                <p className={styles.releaseData}> <FontAwesomeIcon icon={faCalendarDays} /> {movie?.releaseDate}</p>
            </div>
        </div>
        </>
    )
} 