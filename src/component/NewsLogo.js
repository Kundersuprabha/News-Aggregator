import {
    Box,
    Toolbar,
    Stack,
  } from "@mui/material";
import world from "../assets/video/world1.mp4";

const NewsLogo = () => {
    return(
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
            </Stack>
        </Box>
      </Toolbar>
    )
}

export default NewsLogo