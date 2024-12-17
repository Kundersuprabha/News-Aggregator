import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Button, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../../component/Navbar";
import FilterSidebar from "../../component/FilterSidebar";
import NewsCard from "../../component/NewsCard";
import DefaultPersonalizePage from "../../component/DefaultPersonalizedPage";
import {
  fetchGuardianArticles,
  fetchNewsAPIArticles,
  fetchNYTimesArticles,
} from "../../services/api";
import { categories } from "../../constant/data";

const Personalized = () => {
  const isSmall = useMediaQuery("(max-width:400px)");

  const [filters, setFilters] = useState({
    selectedSources: [],
    selectedAuthors: [],
    selectedCategories: [],
  });
  const [values, setValues] = useState({
    source: [],
    author: [],
    category: [],
  });
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSet, setFilterSet] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const fetchInitialFilters = async () => {
    try {
      const newsApi = await fetchNewsAPIArticles("general");
      const guardianArticles = await fetchGuardianArticles("general");
      const nytArticles = await fetchNYTimesArticles("general");

      const allArticles = [...newsApi, ...guardianArticles, ...nytArticles];

      const sources = [...new Set(allArticles.map((article) => article.source))];
      const authors = [...new Set(allArticles.map((article) => article.author))];

      setValues({ source: sources, author: authors, category: categories });
      setNewsData(allArticles);
    } catch (error) {
      console.error("Error fetching initial filters:", error);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updatedFilters = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];

      return { ...prev, [type]: updatedFilters };
    });
    setFilterSet(true);
  };

  useEffect(() => {
    fetchInitialFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterSet) {
      setLoading(true);

      const filteredArticles = newsData.filter((article) => {
        const matchesAuthor =
          filters.selectedAuthors.length === 0 ||
          filters.selectedAuthors.some((selectedAuthor) =>
            article.author?.trim().toLowerCase().includes(selectedAuthor.trim().toLowerCase())
          );

        const matchesCategory =
          filters.selectedCategories.length === 0 ||
          filters.selectedCategories.includes(article.category);

        const matchesSource =
          filters.selectedSources.length === 0 ||
          filters.selectedSources.includes(article.source);

        return matchesAuthor && matchesCategory && matchesSource;
      });

      setData(filteredArticles);
      console.log(filteredArticles, filteredArticles?.length, 'filteredArticles')
      setLoading(false);
    }
  }, [filterSet, filters, newsData]);

  return (
    <>
      <Navbar isPersonalized={true} />
      <Box display="flex" justifyContent="center" padding={2}>
        <Button onClick={toggleDrawer(true)} variant="contained">
          Set Personalized News
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" padding={isSmall ? 0 : 2}>
        <FilterSidebar
          open={open}
          onClose={toggleDrawer(false)}
          filters={filters}
          values={values}
          handleFilterChange={handleFilterChange}
        />
          {loading ? (
            <Box display="flex" justifyContent="center" padding={2}>
              <CircularProgress />
            </Box>
          ) : filterSet ? (
            data.length === 0 ? (
              <DefaultPersonalizePage 
                header="Please Select your more filters" 
                subHeader="There is no news found for the particular filters"
                personalized={toggleDrawer(true)}
              />
            ) : (
              <NewsCard articles={data} />
            )
          ) : (
            <DefaultPersonalizePage 
              header="Please Select your personalized news" 
              subHeader="Apply filters... Let’s start personalized!"
              personalized={toggleDrawer(true)}
            />
          )}
      </Box>
    </>
  );
};

export default Personalized;