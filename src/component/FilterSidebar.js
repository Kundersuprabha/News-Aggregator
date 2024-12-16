import React from "react";
import {
  Drawer,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilterSidebar = ({
  filters,
  open,
  onClose,
  values,
  handleFilterChange,
}) => {
  const isSmall = useMediaQuery("(max-width:400px)");

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
          border: "2px solid #ccc",
          borderRadius: "8px",
          width: 300,
          position: "relative",
        }}
      >
        {isSmall && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "right",
              position: "relative",
              height: "2rem",
              marginBottom: "1rem",
            }}
          >
            <IconButton
              onClick={onClose}
              size="small" 
              sx={{
                fontSize: "small",
                color: "inherit",
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Typography variant="h6" gutterBottom sx={{ fontSize: "0.875rem", mt: isSmall ? 4 : 0 }}>
          Filter By Sources
        </Typography>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {sources.map((source) => (
            <FormControlLabel
              key={source}
              control={
                <Checkbox
                  size="small"
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
            flexWrap: "wrap",
          }}
        >
          {authors.map((author) => (
            <FormControlLabel
              key={author}
              control={
                <Checkbox
                  size="small"
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
                  size="small"
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
