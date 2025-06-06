export interface ManuallyMovie {
    title: string,
    imageUrl: string,
    description: string,
    releaseDate: string,
    id: string,
    favorite?: boolean
}

export interface IMDbMovie {
    title: string,
    imageUrl: string,
    id: string,
    favorite?: boolean
}

export interface IMDbApiResponse {
    Actors: string,
    Director: string,
    Genre: string,
    Plot: string,
    Poster: string,
    Released: string,
    Runtime: string,
    Title: string,
    Writer: string, 
    imdbRating: string,
    Response: string
}