import { Movie } from "../movieInterface"

export async function getMovies(): Promise<Movie[]> {
    const api = await fetch('http://localhost:3000/movies')

    if(!api.ok) {
        throw new Error (`Error: ${api.status}`)
    }

    return api.json() 
}