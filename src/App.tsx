import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spiner";
import { IMovie, Movie } from "./models/movie";
import MovieCard from "./components/MovieCard";
// c8de0e34a103f203ec06066253eda5ab api key
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
	methot: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

function App() {
	// const [count, setCount] = useState(0);
	const [searchTerm, setsearchTerm] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [movieList, setMovieList] = useState<IMovie[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

	// Only runs this once the component loads if the deps array is empty
	// This hook is basicaly a subscription to the debouncedSearchTerm and it will trigger
	// every time it changes
	useEffect(() => {
		fetchMovies(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	// This is from the react-use package and it will trigger every time search tearm change
	useDebounce(
		() => {
			setDebouncedSearchTerm(searchTerm);
		},
		500,
		[searchTerm]
	);

	const fetchMovies = async (query = "") => {
		try {
			setIsLoading(true);
			setErrorMessage("");

			const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}

			const data = await response.json();

			if (data.Response === "False") {
				setMovieList([]);
				setErrorMessage(data.Error || "Error fetching movies. Please try again later");
				return;
			}

			// Set to model
			const movies: IMovie[] = data.results.map((el: any) => new Movie(el));

			setMovieList(movies || []);

			console.log(data);
		} catch (error) {
			console.log(`Error fetching movies: ${error}`);
			setErrorMessage("Error fetching movies. Please try again later");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<main>
				<div className="pattern" />
				<div className="wrapper">
					<header>
						<img src="./hero.png" alt="Hero app" />
						<h1 className="text-gradient">
							Find <span>Movies</span> You'll enjoy without a Hassle
						</h1>
						<Search searchTerm={searchTerm} setSearchTerm={(search) => setsearchTerm(search)} />
					</header>

					<section className="all-movies">
						<h2 className="mt-[40px]">All movies</h2>

						{isLoading ? (
							<Spinner />
						) : errorMessage ? (
							<p className="text-red-500">{errorMessage}</p>
						) : (
							<ul>
								{movieList.map((movie: IMovie) => (
									<MovieCard key={movie.id} {...movie} />
								))}
							</ul>
						)}

						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
					</section>
				</div>
			</main>
		</>
	);
}

export default App;
