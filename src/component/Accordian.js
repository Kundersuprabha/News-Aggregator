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
        backgroundColor: "transparent",
        boxShadow: "none",
        margin: 0,
        border: "none",
        "&:before": { display: "none" },
        ...style
      }}
    >
      {/* Accordion Header */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={{
          minHeight: "auto",
          padding: 0,
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        <Typography sx={{ fontSize: "1rem", textTransform: "none" }}>
          {selectedValue}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: 0,
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
