import * as React from "react";
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
import world from "../assets/video/world1.mp4";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState("General");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSearch(category.toLowerCase()); // Update search state in lowercase
    setSelectedCategory(category); // Update the selected category for UI
    setAnchorEl(null); // Close the menu
  };

  const categories = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  return (
    <AppBar position="sticky" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Stack direction="row" spacing={4} alignItems="center">
              <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <video
              src={world}
              autoPlay
              loop
              muted
              style={{
                height: '70px', // Adjust video height
                width: 'auto',  // Maintain aspect ratio
              }}
            />
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <video
              src={world}
              autoPlay
              loop
              muted
              style={{
                height: '40px', // Adjust for smaller screen sizes
                width: 'auto',
              }}
            />
          </Box>
                <Typography sx={{ color: "white", cursor: "pointer", fontSize: "1rem" }}>Home</Typography>
                <Typography sx={{ color: "white", cursor: "pointer", fontSize: "1rem" }}>Personalized</Typography>
                <Button
                  aria-controls="category-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
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
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
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
                <Typography sx={{ color: "white", cursor: "pointer", fontSize: "1rem" }}>All Data Source</Typography>
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
    </AppBar>
  );
};

export default Navbar;
