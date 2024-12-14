import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  styled,
  alpha,
  Box,
  InputBase,
  Toolbar,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewsLogo  from './NewsLogo'
import {news, categories} from '../constant/data'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ handleInput, setSearch }) => {
  const navigate = useNavigate();
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedNews, setSelectedNews] = useState("All Data Source");

  const handleCategoryMenuOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleNewsMenuOpen = (event) => {
    setNewsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setCategoryAnchorEl(null);
    setNewsAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSearch(category.toLowerCase()); // Update search state in lowercase
    setSelectedCategory(category); // Update the selected category for UI
    setCategoryAnchorEl(null); // Close the menu
  };

  const handleNewsSelect = (news) => {
    setSearch(news.toLowerCase()); // Fix the incorrect toLowerCase function
    setSelectedNews(news);
    setNewsAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "black" }}>
      <Stack direction="row" spacing={2}>
      <NewsLogo />
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography
                  sx={{ color: "white", cursor: "pointer", fontSize: "1rem" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </Typography>
                <Typography
                  sx={{ color: "white", cursor: "pointer", fontSize: "1rem" }}
                  onClick={() => navigate("/personalized")}
                >
                  Personalized
                </Typography>
                <Button
                  aria-controls="category-menu"
                  aria-haspopup="true"
                  onClick={handleCategoryMenuOpen}
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {selectedCategory}
                </Button>
                <Menu
                  id="category-menu"
                  anchorEl={categoryAnchorEl}
                  open={Boolean(categoryAnchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                  PaperProps={{
                    style: {
                      backgroundColor: "#222",
                      color: "white",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Menu>
                <Button
                  aria-controls="news-menu"
                  aria-haspopup="true"
                  onClick={handleNewsMenuOpen}
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {selectedNews}
                </Button>
                <Menu
                  id="news-menu"
                  anchorEl={newsAnchorEl}
                  open={Boolean(newsAnchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                  PaperProps={{
                    style: {
                      backgroundColor: "#222",
                      color: "white",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  {news.map((newsItem) => (
                    <MenuItem
                      key={newsItem}
                      onClick={() => handleNewsSelect(newsItem)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    >
                      {newsItem}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </Box>
          </Toolbar>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleInput}
              />
            </Search>
          </Toolbar>
        </Stack>
      </Container>
      </Stack>
    </AppBar>
  );
};


export default Navbar;
