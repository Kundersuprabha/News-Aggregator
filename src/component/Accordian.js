import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordian = ({ id, selectedValue, menuItems, onSelect, style }) => {
  return (
    <Accordion
      disableGutters
      square
      sx={{
        backgroundColor: "transparent", // No background
        boxShadow: "none", // Remove box shadow
        margin: 0, // Remove margin
        border: "none", // Remove border
        "&:before": { display: "none" }, // Remove MUI's default line
        ...style
      }}
    >
      {/* Accordion Header */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={{
          minHeight: "auto", // Reduce extra height
          padding: 0, // Remove padding
          "& .MuiAccordionSummary-content": {
            margin: 0, // Remove content margin
          },
        }}
      >
        <Typography sx={{ fontSize: "1rem", textTransform: "none" }}>
          {selectedValue}
        </Typography>
      </AccordionSummary>

      {/* Accordion Content */}
      <AccordionDetails
        sx={{
          padding: 0, // Remove padding
        }}
      >
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item}
              onClick={() => onSelect(item)}
              sx={{
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {item}
            </ListItemButton>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordian;
