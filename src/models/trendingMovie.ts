export class TrendingMovie implements ITrendingMovie {
	movieId: number;

	posterPath: string;

	count: number;

	constructor(data: any) {
		this.movieId = data?.movie_id ?? 0;
		this.posterPath = data?.poster_url ?? "";
		this.count = data?.count ?? 0;
	}
}

export interface ITrendingMovie {
	movieId: number;
	posterPath: string;
	count: number;
}
