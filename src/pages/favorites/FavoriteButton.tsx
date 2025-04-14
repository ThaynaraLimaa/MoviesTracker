import styles from './FavoriteButton.module.css'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMovie } from "../../service/fecthMovies";
import { IMDbMovie, ManuallyMovie } from "../../movieInterface";

interface FavoriteButtonProps {
    movie: ManuallyMovie | IMDbMovie,
    isFavorite: boolean,
    queryKeyName: string
}

export default function FavoriteButton({ movie, isFavorite, queryKeyName }: FavoriteButtonProps) {
    const queryClient = useQueryClient(); 

    const handleToggleFavoriteMutation = useMutation({
        mutationFn: editMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeyName, movie.id]})
        }
    })

    // Change favorite value in json-server
    const onToggleFavorite = () => {
        handleToggleFavoriteMutation.mutate({
            ...movie,
            favorite: !movie.favorite
        })
    }

    return (
        <button className={styles.favoriteBtn} onClick={onToggleFavorite}>
            <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeart} />
        </button>
    )
}