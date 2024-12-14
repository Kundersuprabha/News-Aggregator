import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const DropDownMenu = ({
  id,
  selectedValue,
  menuItems,
  anchorEl,
  onOpen,
  onClose,
  onSelect,
}) => {
  return (
    <>
      <Button
        aria-controls={id}
        aria-haspopup="true"
        onClick={onOpen}
        sx={{
          color: "white",
          fontSize: "1rem",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {selectedValue}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        MenuListProps={{ "aria-labelledby": `${id}-button` }}
        PaperProps={{
          style: {
            backgroundColor: "#222",
            color: "white",
            fontSize: "0.9rem",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              onSelect(item);
              onClose();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropDownMenu;
