import axios from 'axios'

// const API_KEY = 'YOUR_NEWS_API_KEY' // Get from NewsAPI.org
// const BASE_URL = 'https://newsapi.org/v2'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

export const newsApi = {
  getTopNews: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: 'us',
          pageSize: 10,
          page,
          apiKey: API_KEY
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  },

  searchNews: async (query, filters = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          from: filters.dateFrom,
          to: filters.dateTo,
          sortBy: 'publishedAt',
          pageSize: 20,
          apiKey: API_KEY,
          ...filters
        }
      })
      return response.data
    } catch (error) {
      console.error('Error searching news:', error)
      throw error
    }
  }
}