import { Client, Databases, ID, Query } from "appwrite";
// https://cloud.appwrite.io/console/project-67cc448c00131b2b41b0/databases/database-67cc45ab001701e1757a/collection-67cc461100292e2d58e9/settings
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
	// 1. Use Appwrite SDK to check if search term exists in the database
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)]);
		// 2. If ti does update the count

		if (result.documents.length > 0) {
			const doc = result.documents[0];

			await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
				count: doc.count + 1,
			});
		}
		// 3. If it doesn't, create a new doc with the search term and count
		else {
			await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				count: 1,
				searchTerm: searchTerm,
				movie_id: movie.id,
				poster_url: `https://image.tmdb.org/t/p/w500${movie.posterPath}`,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const getTrendingMovies = async () => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")]);

		return result.documents;
	} catch (error) {
		console.log(error);
	}
};
