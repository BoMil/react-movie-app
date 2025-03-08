import { IMovie } from "../models/movie";

const MovieCard = (movie: IMovie) => {
	const imagePath = "https://image.tmdb.org/t/p/w500/";
	return (
		<div className="movie-card">
			<img src={movie.posterPath ? `${imagePath}${movie.posterPath}` : "./no-movie.png"} alt="title" />

			<div className="mt-4">
				<h3>{movie.title}</h3>

				<div className="content">
					<div className="rating">
						<img src="./star.svg" alt="Star icon" />
						<p className="">{movie.voteAverage ? movie.voteAverage.toFixed(1) : "N/A"}</p>
					</div>

					<span>•</span>
					<p className="lang">{movie.originalLanguage}</p>
					<span>•</span>
					<p className="year">{movie.releaseDate ? movie.releaseDate.split("-")[0] : "N/A"}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
