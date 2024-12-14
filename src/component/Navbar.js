import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NewsLogo from "./NewsLogo";
import { news, categories } from "../constant/data";
import DropDownMenu from "./DropDownMenu";
import Search from "./Search";
import Accordian from "./Accordian";

const Navbar = ({ handleInput, setSearch, setSelectedSource, isPersonalized }) => {
  const navigate = useNavigate();
  const isSmall = useMediaQuery("(max-width:899px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedNews, setSelectedNews] = useState("All Data Source");

  // Handlers for dropdown menus
  const handleCategoryMenuOpen = (event) => setCategoryAnchorEl(event.currentTarget);
  const handleNewsMenuOpen = (event) => setNewsAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setCategoryAnchorEl(null);
    setNewsAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSearch(category.toLowerCase());
    setSelectedCategory(category);
    setDrawerOpen(false);
    handleMenuClose();
  };

  const handleNewsSelect = (news) => {
    setSelectedSource(news);
    setSelectedNews(news);
    setDrawerOpen(false);
    handleMenuClose();
  };

  // Drawer Content
  const renderDrawerContent = () => (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography
        sx={{ color: "black", cursor: "pointer", mb: 2, fontSize: "1rem" }}
        onClick={() => {
          navigate("/");
          setDrawerOpen(false);
        }}
      >
        Home
      </Typography>
      <Typography
        sx={{ color: "black", cursor: "pointer", mb: 2, fontSize: "1rem" }}
        onClick={() => {
          navigate("/personalized");
          setDrawerOpen(false);
        }}
      >
        Personalized
      </Typography>

      {/* Dropdown Menus */}
      {!isPersonalized && (
        <>
          <Accordian
            id="category-menu"
            selectedValue={selectedCategory}
            menuItems={categories}
            onSelect={handleCategorySelect}
            style={{ mb: 2 }}
          />
          <Accordian
            id="news-menu"
            selectedValue={selectedNews}
            menuItems={news}
            onSelect={handleNewsSelect}
          />
        </>
      )}
      <Box sx={{ mt: 2 }}>
        <Search handleInput={handleInput} />
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* NewsLogo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NewsLogo />
          </Box>

          {/* Hamburger Menu for Small Screens */}
          {isSmall ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                {renderDrawerContent()}
              </Drawer>
            </>
          ) : (
            // Regular Content for Larger Screens
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

              {/* Dropdown Menus */}
              {!isPersonalized && (
                <>
                  <DropDownMenu
                    id="category-menu"
                    selectedValue={selectedCategory}
                    menuItems={categories}
                    anchorEl={categoryAnchorEl}
                    onOpen={handleCategoryMenuOpen}
                    onClose={handleMenuClose}
                    onSelect={handleCategorySelect}
                  />
                  <DropDownMenu
                    id="news-menu"
                    selectedValue={selectedNews}
                    menuItems={news}
                    anchorEl={newsAnchorEl}
                    onOpen={handleNewsMenuOpen}
                    onClose={handleMenuClose}
                    onSelect={handleNewsSelect}
                  />
                </>
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Search handleInput={handleInput} />
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
