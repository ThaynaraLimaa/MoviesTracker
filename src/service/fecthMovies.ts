import { Movie } from "../movieInterface"

export async function getMovies(): Promise<Movie[]> {
    const api = await fetch('http://localhost:3000/movies')

    if (!api.ok) {
        throw new Error(`Error: ${api.status}`)
    }

    return api.json()
}

export async function getMovie(id: string): Promise<Movie> {
    const api = await fetch(`http://localhost:3000/movies/${id}`)

    if (!api.ok) {
        throw new Error(`${api.status}`)
    }

    return api.json()
}

export async function postMovie(newMovie: Movie) {
    const api = await fetch(`http://localhost:3000/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
    })

    if (!api.ok) {
        throw new Error(`Failed to add the movie`)
    }

    return api.json()
}

export async function editMovie(editedMovie: Movie) {
    const api = await fetch(`http://localhost:3000/movies/${editedMovie.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(editedMovie)
    })

    if(!api.ok) {
        throw new Error('Failed to edit movie')
    }

    return api.json() 
}

export async function deleteMovie(id: string) {
    const api = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE", 
    })

    if(!api.ok) {
        throw new Error(`Failed to delete the movie`)
    }

    return api.json()
}