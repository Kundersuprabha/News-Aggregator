import { Box, Toolbar, Stack } from "@mui/material";
import world from "../assets/video/world1.mp4";

const NewsLogo = () => {
  return (
    <Toolbar disableGutters>
      <Box
        sx={{
          display: "flex", // Always display
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              mr: 2,
              display: "flex", // Always display on all screen sizes
              alignItems: "center",
            }}
          >
            <video
              src={world}
              autoPlay
              loop
              muted
              style={{
                height: "50px", // Smaller height for better fit on small screens
                width: "auto",  // Maintain aspect ratio
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Toolbar>
  );
};

export default NewsLogo;
