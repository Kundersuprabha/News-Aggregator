import React from "react";
import {
  Drawer,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const FilterSidebar = ({ filters, setFilters, open, onClose }) => {
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <Drawer open={open} onClose={onClose} sx={{ padding: "1rem" }}>
      <Box sx={{ padding: "1rem", color: "#fff" }}>
        <Typography variant="h6" sx={{color:'black'}} gutterBottom>
          Filter By Sources
        </Typography>
        <FormGroup>
          {filters.sources.map((source) => (
            <FormControlLabel
              key={source}
              control={
                <Checkbox
                  checked={filters.selectedSources.includes(source)}
                  onChange={() => handleFilterChange("selectedSources", source)}
                />
              }
              label={source}
            />
          ))}
        </FormGroup>

        <Typography variant="h6"  sx={{color:'black'}} gutterBottom>
          Filter By Authors
        </Typography>
        <FormGroup>
          {filters.authors.map((author) => (
            <FormControlLabel
              key={author}
              control={
                <Checkbox
                  checked={filters.selectedAuthors.includes(author)}
                  onChange={() => handleFilterChange("selectedAuthors", author)}
                />
              }
              label={author}
            />
          ))}
        </FormGroup>

        <Typography variant="h6"  sx={{color:'black'}} gutterBottom>
          Filter By Categories
        </Typography>
        <FormGroup>
          {filters.categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleFilterChange("selectedCategories", category)}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;
