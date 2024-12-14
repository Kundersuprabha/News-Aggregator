import React from "react";
import { Box, Typography } from "@mui/material";
import news from '../assets/pictures/news.jpg';

const DefaultPersonalizePage = ({personalized}) => {
  return (
    <Box
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        }}
        onClick ={personalized}
    >
    <Box
      component="img"
      src={news}
      alt="Empty Cart"
      sx={{
        width: "120px",
        height: "120px",
        mb: 2,
      }}
    />

    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000000" }}>
      Please Select your personalized news
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "#64748b",
        mb: 3,
      }}
    >
      Apply filters... Let’s start personalized!
    </Typography>
  </Box>
  );
};

export default DefaultPersonalizePage;
