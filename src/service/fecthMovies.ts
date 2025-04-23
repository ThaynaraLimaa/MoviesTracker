import { ManuallyMovie, IMDbMovie, IMDbApiResponse } from "../movieInterface"

interface GetMovies {
    movies: ManuallyMovie[], 
    hasMore: boolean
}

export async function getMovies(): Promise<ManuallyMovie[]> {
    const api = await fetch('http://localhost:3000/movies')

    if (!api.ok) {
        throw new Error(`Error: ${api.status}`)
    }

    return api.json()
}

export async function getMoviesPagination(page: number, limitPerPage: number): Promise<GetMovies> {
    const api = await fetch(`http://localhost:3000/movies?_page=${page}&_limit=${limitPerPage}`)

    if (!api.ok) {
        throw new Error(`Error: ${api.status}`)
    }

    const movies = await api.json()
    const hasMore = (page * limitPerPage) < Number(api.headers.get('x-total-count'))

    return {
        movies: movies, 
        hasMore: hasMore
    }
}

export async function getMovie(id: string): Promise<ManuallyMovie> {
    const api = await fetch(`http://localhost:3000/movies/${id}`)

    if (!api.ok) {
        throw new Error(`${api.status}`)
    }

    return api.json()
}

export async function postMovie(newMovie: ManuallyMovie | IMDbMovie) {
    // Check if the movie is alredy added
    if(newMovie.id.startsWith('tt')) {
        const checks = await fetch(`http://localhost:3000/movies/${newMovie.id}`)
        if(checks.ok) {
             throw new Error('Movie already added to your collection')
        } 
    }
    const api = await fetch(`http://localhost:3000/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
    })

    if (!api.ok) {
        console.log(api.text)
        throw new Error(`Failed to add the movie`)
    }

    return api.json()
}

export async function editMovie(editedMovie: ManuallyMovie |IMDbMovie) {
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


// fetch from OMDb API
export async function getOMDbMovie(id: string): Promise<IMDbApiResponse> {
    const api = await fetch(`http://www.omdbapi.com/?apikey=706c99d8&i=${id}`); 
    if(!api.ok) {
        throw new Error('Failed to get the movie form OMDb API')
    }

    return api.json()
}