import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";
import defaultImage from '../assets/pictures/deaultImage.jpg';


const NewsCard = ({articles}) => {

  return (
    <Box sx={{ p: 4, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        {articles?.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345,minWidth: 300, backgroundColor: "#1e1e1e", color: "white" }}>
              <CardMedia
                component="img"
                alt={article?.title || "News Image"}
                height="180"
                image={article?.urlToImage || defaultImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {article?.title || "No title available"}
                </Typography>
                <Typography variant="body2" color="gray">
                  {article?.description || "No description available"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" display="block" sx={{ color: "lightgray" }}>
                    ▼ Source and Published Date
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: "lightgray" }}>
                    Source: {article?.source?.name || "Unknown"}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: "lightgray" }}>
                    Published at: {new Date(article?.publishedAt).toLocaleString() || "N/A"}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: "lightgray" }}>
                    Author: {article?.author || "Unknown"}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Button
                  variant="contained"
                  href={article?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  Read more ➔
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsCard;
