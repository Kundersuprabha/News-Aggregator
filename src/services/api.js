import axios from "axios";
import newsImage from "../assets/pictures/deaultImage.jpg";

const NEWS_API_KEY = "821973d80ae24a5cbdd15a6a4e5d84e2";
const GUARDIAN_API_KEY = "758d2d2a-cec1-4de0-8580-e013bf4157bc";
const NYT_API_KEY = "AuVNp7XClx6YMdpvMYb82modBKc4Qkvb";

const makeApiRequest = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};

const normalizeArticles = (articles, source) => {
  return articles.map((article) => {
    const normalizedArticle = {
      title: article.title || article.webTitle || article.headline?.main || "No Title",
      description:
        article.description || article.fields?.trailText || article.lead_paragraph || "No Description",
      url: article.url || article.webUrl || article.web_url || "#",
      source: article?.source?.name  ||article?.source  || article?.fields?.publication ||  source || "Unknown Source",
      publishedAt: article.publishedAt || article.webPublicationDate || article.pub_date || "Unknown Date",
      author: article?.author || article?.fields?.byline || article?.byline?.original || "Unknown Author",
      category: article?.category || article?.sectionName || "General",
      imgSrc:
        article?.urlToImage || article.image || article?.thumbnail || article.fields?.thumbnail || article?.main || newsImage,
    };
    return normalizedArticle;
  });
};

// Fetch NewsAPI articles
export const fetchNewsAPIArticles = async (query, filters = {}) => {
  const { category } = filters;
  const time = localStorage.getItem("time") || "2024-01-01";
  
  // Build URL based on query and category
  const searchUrl = `https://newsapi.org/v2/everything?q=${query}&from=${time}`;
  const topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category || "general"}`;

  const url = query ? searchUrl : topHeadlinesUrl;
  const params = { apiKey: NEWS_API_KEY };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.articles || [], "NewsAPI") : [];
};

// Fetch The Guardian articles
export const fetchGuardianArticles = async (query, filters = {}) => {
  const url = `https://content.guardianapis.com/search`;
  const params = {
    q: query || filters.category || "general",
    from: localStorage.getItem("time"),
    "api-key": GUARDIAN_API_KEY,
    "show-fields": "all",
  };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.response?.results || [], "The Guardian") : [];
};

// Fetch New York Times articles
export const fetchNYTimesArticles = async (query, filters = {}) => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  const params = {
    fq: query || filters.category || "general",
    begin_date: localStorage.getItem("time")?.replace(/-/g, "") || "20240101",
    "api-key": NYT_API_KEY,
  };

  const data = await makeApiRequest(url, params);
  console.log(data?.response?.docs, "The nyttimes")

  return data ? normalizeArticles(data.response?.docs || [], "The New York Times") : [];
};