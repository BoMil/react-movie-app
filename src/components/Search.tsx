// const Search = ({searchTerm, setSearchTerm}) => {
// 	return <div className="text-white text-3xl">Search</div>;
// };
// export default Search;

// import { useState } from 'react';

interface SearchProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
	return (
		<div className="search">
			<div>
				<img src="./search.svg" />

				<input type="text" placeholder="Search movies" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
			</div>
		</div>
	);
};

export default Search;
