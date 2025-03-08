export class Movie implements IMovie {
	adult: boolean;
	backdropPath: string;
	genreIds: number[];
	id: number;
	originalLanguage: string;
	originalTitle: string;
	overview: string;
	posterPath: string;
	popularity: number;
	releaseDate: string;
	title: string;
	video: boolean;
	voteAverage: number;
	voteCount: number;

	constructor(data: any) {
		this.adult = data?.adult ?? false;
		this.backdropPath = data?.backdrop_path ?? "";
		this.genreIds = data?.genre_ids ?? [];
		this.id = data?.id ?? 0;
		this.originalLanguage = data?.original_language ?? "";
		this.originalTitle = data?.original_title ?? "";
		this.overview = data?.overview ?? "";
		this.popularity = data?.popularity ?? 0;
		this.posterPath = data?.poster_path ?? "";
		this.releaseDate = data?.release_date ?? "";
		this.title = data?.title ?? "";
		this.video = data?.video ?? false;
		this.voteAverage = data?.vote_average ?? 0;
		this.voteCount = data?.vote_count ?? 0;
	}
}

export interface IMovie {
	adult: boolean;
	backdropPath: string;
	genreIds: number[];
	id: number;
	originalLanguage: string;
	originalTitle: string;
	overview: string;
	popularity: number;
	posterPath: string;
	releaseDate: string;
	title: string;
	video: boolean;
	voteAverage: number;
	voteCount: number;
}
