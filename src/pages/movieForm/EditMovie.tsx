import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../service/fecthMovies";
import ErrorMessage from "../../components/UI/ErrorMessage";
import ManuallyForm from "./ManuallyForm";

export default function EditMovie() {
    const { id } = useParams();

    const { data: movie, error, isLoading, isError } = useQuery({
        queryKey: ["movies", id],
        queryFn: () => getMovie(id as string)
    })

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <ErrorMessage name={error.name} message={`Error: ${error.message}`} />

    return (
        <ManuallyForm movie={movie}/>
    )
}