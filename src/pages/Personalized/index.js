import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Drawer
} from "@mui/material";
import FilterSidebar from "../../component/FilterSidebar";

const Personalized = () => {
  const [filters, setFilters] = useState({
    sources: [],
    authors: [],
    categories: [],
    selectedSources: [],
    selectedAuthors: [],
    selectedCategories: [],
  });

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const fetchNews = async () => {
    const query = [
      filters.selectedSources.length ? `sources=${filters.selectedSources.join(",")}` : "",
      filters.selectedAuthors.length ? `authors=${filters.selectedAuthors.join(",")}` : "",
      filters.selectedCategories.length ? `categories=${filters.selectedCategories.join(",")}` : "",
    ]
      .filter(Boolean)
      .join("&");

    setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?${query}&apiKey=YOUR_API_KEY`
      );
      const data = await response.json();
      setNewsData(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filters.selectedSources, filters.selectedAuthors, filters.selectedCategories]);

  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
        {loading ? (
          <CircularProgress />
        ) : newsData.length ? (
          newsData.map((article, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                marginBottom: 2,
                width: "80%",
                backgroundColor: "#f9f9f9",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <>
          <Typography>No news available for selected filters.</Typography>
          <Button onClick={toggleDrawer(true)}>Open drawer</Button>
          <FilterSidebar open={open} onClose={toggleDrawer(false)} filters={filters} setFilters={setFilters} />
          </>
        )}
      </Box>
    </>
  );
};

export default Personalized;