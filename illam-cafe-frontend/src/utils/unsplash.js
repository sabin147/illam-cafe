// Unsplash API utility for fetching coffee shop images
// Using public Unsplash API (no API key required for basic usage)

const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const UNSPLASH_ACCESS_KEY = 'sC5ZvTvRKDn73gNc8gK_6qn0jOi8cWWpPLZrGOqHmQ0';

// Cache to avoid repeated API calls
const imageCache = {};

/**
 * Fetch random coffee shop related image
 * @param {string} query - Search query (e.g., 'coffee', 'cafe', 'espresso')
 * @param {number} count - Number of images to fetch
 * @returns {Promise<Array>} Array of image objects
 */
export const fetchCoffeeImages = async (query = 'coffee shop', count = 1) => {
  const cacheKey = `${query}-${count}`;
  
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    const images = data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      title: img.description || img.alt_description || 'Coffee Shop Image',
      attribution: `Photo by ${img.user.name}`,
      attributionUrl: img.user.links.html
    }));

    imageCache[cacheKey] = images;
    return images;
  } catch (error) {
    console.error('Failed to fetch images:', error);
    // Return placeholder images on failure
    return getPlaceholderImages(count);
  }
};

/**
 * Fetch single image for hero section
 */
export const fetchHeroImage = async () => {
  return fetchCoffeeImages('luxury coffee cafe interior', 1).then(imgs => imgs[0]);
};

/**
 * Fetch featured product images
 */
export const fetchProductImages = async () => {
  const queries = ['espresso', 'cappuccino', 'latte', 'specialty coffee drink'];
  const images = [];
  
  for (const query of queries) {
    const result = await fetchCoffeeImages(query, 1);
    if (result[0]) images.push(result[0]);
  }
  
  return images;
};

/**
 * Fetch about section images
 */
export const fetchAboutImages = async () => {
  return fetchCoffeeImages('coffee beans harvest', 2);
};

/**
 * Get placeholder images as fallback
 */
const getPlaceholderImages = (count) => {
  const placeholders = [
    {
      id: 'placeholder-1',
      url: 'https://images.unsplash.com/photo-1442512595331-e89e30266538?w=1200&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1442512595331-e89e30266538?w=300&h=300&fit=crop',
      title: 'Coffee Shop',
      attribution: 'Unsplash'
    },
    {
      id: 'placeholder-2',
      url: 'https://images.unsplash.com/photo-1495474472645-4d71bcdd2085?w=1200&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1495474472645-4d71bcdd2085?w=300&h=300&fit=crop',
      title: 'Coffee Beans',
      attribution: 'Unsplash'
    },
    {
      id: 'placeholder-3',
      url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop',
      title: 'Espresso Shot',
      attribution: 'Unsplash'
    },
    {
      id: 'placeholder-4',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop',
      title: 'Coffee Pour',
      attribution: 'Unsplash'
    }
  ];

  return placeholders.slice(0, count);
};

export default {
  fetchCoffeeImages,
  fetchHeroImage,
  fetchProductImages,
  fetchAboutImages,
  getPlaceholderImages
};
