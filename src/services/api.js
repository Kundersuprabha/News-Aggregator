import axios from "axios";
import newsImage from "../assets/pictures/deaultImage.jpg";

const NEWS_API_KEY = '7187310c4f0d449db087c631f21da5fa';
const GUARDIAN_API_KEY ='758d2d2a-cec1-4de0-8580-e013bf4157bc' ;
const NYT_API_KEY = 'AuVNp7XClx6YMdpvMYb82modBKc4Qkvb';

// Helper function to make API requests
const makeApiRequest = async (url, params) => {
  try {
    const response = await axios.get(url, { params });

    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};

// Helper function to normalize article data
const normalizeArticles = (articles, source) => {
  return articles.map((article) => ({
    title: article.title || article.webTitle || article.headline?.main,
    description: article.description || article.fields?.trailText || article.lead_paragraph,
    url: article.url || article.webUrl || article.web_url,
    source: article?.source?.name || article?.fields?.publication || source,
    publishedAt: article.publishedAt || article.webPublicationDate || article.pub_date,
    author: article?.author || article?.fields?.byline || article?.byline?.original || "Unknown Author",
    category: article?.category || article?.sectionName || "General",
    imgSrc: article?.urlToImage || article.image || article?.thumbnail || article?.main || newsImage
  }));
};

// Fetch NewsAPI articles
export const fetchNewsAPIArticles = async (query, filters) => {
    const earliestAllowedDate = "2024-11-13"; // Adjusted to one day later for safety
  
    // Validate the date
    const validDate = filters.date < earliestAllowedDate ? earliestAllowedDate : filters.date;
  
    // Include the API key in the URL parameters
    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&from=${validDate}&apiKey=${NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${filters.category}&apiKey=${NEWS_API_KEY}`;
  
    console.log("Requesting URL:", url);
    console.log("Valid Request Date:", validDate);
  
    const data = await makeApiRequest(url, {});
    return data ? normalizeArticles(data.articles, "NewsAPI") : [];
};

  

// Fetch The Guardian articles
export const fetchGuardianArticles = async (query, filters) => {
  const url = `https://content.guardianapis.com/search`;
  const params = {
    q: query || filters.category,
    "api-key": GUARDIAN_API_KEY,
    "show-fields": "all",
  };
  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.response.results, "The Guardian") : [];
};

// Fetch New York Times articles
export const fetchNYTimesArticles = async (query, filters) => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  const params = {
    fq: query,
    from: filters.date,
    "api-key": NYT_API_KEY,
    category: filters.category,
  };
  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.response.docs, "The New York Times") : [];
};
