import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const UnsplashGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('nature'); // Initial search term
  const [query, setQuery] = useState('nature'); // The query used for fetching photos
  const clientId = '5AnSWDbivjbRgbJcq50XjcYYLLIQaLGdoGd0ofop9PA';

  const fetchPhotos = useCallback(async () => {
    const randomPage = Math.floor(Math.random() * 10) + 1; // Get a random page number between 1 and 10
    const apiUrl = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${clientId}&page=${randomPage}`;
    try {
      const response = await axios.get(apiUrl);
      console.log('Response data:', response.data);
      const photoUrls = response.data.results.map(photo => ({
        id: photo.id,
        url: `${photo.urls.raw}&fit=facearea&facepad=8&w=1024&h=1024&q=80`,
        description: photo.description || 'No description',
      }));
      setPhotos(photoUrls);
    } catch (error) {
      console.error('Error fetching data from Unsplash:', error);
    }
  }, [clientId, query]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setQuery(searchQuery);
    fetchPhotos();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Unsplash Gallery</h1>
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded mr-2"
          placeholder="Search for images"
        />
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <button
        onClick={fetchPhotos}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Load Random Images
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={photo.url} alt={photo.description} className="w-full h-auto" />
            <p className="p-8 text-xs text-gray-700">{photo.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnsplashGallery;
