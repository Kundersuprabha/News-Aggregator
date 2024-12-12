import React from "react";
import {
  Drawer,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const FilterSidebar = ({ filters, setFilters, open, onClose, values, handleFilterChange }) => {
  const sources = values?.source || [];
  const authors = values?.author || [];
  const categories = values?.category || [];

  return (
    <Drawer open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#fff",
          color: "black",
          border: "2px solid #ccc", // Increased border size
          borderRadius: "8px", // Optional: rounds the corners
          width: 300, // Optional: adjust sidebar width
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontSize: "0.875rem" }}>
          Filter By Sources
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap", // Makes checkboxes flow side by side
          }}
        >
          {sources.map((source) => (
            <FormControlLabel
              key={source}
              control={
                <Checkbox
                  size="small"  // Make the checkbox smaller
                  checked={filters.selectedSources.includes(source)}
                  onChange={() => handleFilterChange("selectedSources", source)}
                />
              }
              label={<Typography sx={{ fontSize: "0.75rem" }}>{source}</Typography>}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" gutterBottom sx={{ fontSize: "0.875rem" }}>
          Filter By Authors
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap", // Makes checkboxes flow side by side
          }}
        >
          {authors.map((author) => (
            <FormControlLabel
              key={author}
              control={
                <Checkbox
                  size="small"  // Make the checkbox smaller
                  checked={filters.selectedAuthors.includes(author)}
                  onChange={() => handleFilterChange("selectedAuthors", author)}
                />
              }
              label={<Typography sx={{ fontSize: "0.75rem" }}>{author}</Typography>}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" gutterBottom sx={{ fontSize: "0.875rem" }}>
          Filter By Categories
        </Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  size="small"  // Make the checkbox smaller
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleFilterChange("selectedCategories", category)}
                />
              }
              label={<Typography sx={{ fontSize: "0.75rem" }}>{category}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>
    </Drawer>
  );
};


export default FilterSidebar;
