import React from "react";
import { IconButton, Chip } from "@mui/material";
import { X } from "lucide-react";
const CustomChip = ({ label, onDelete }) => {
  return (
    <Chip
      label={label}
      deleteIcon={
        <IconButton
          onMouseDown={(e) => e.stopPropagation()} // Prevent dropdown toggle
          onClick={(e) => {
            e.stopPropagation(); // Prevent again just in case
            onDelete(e);
          }}
          size="small"
        >
          <X />
        </IconButton>
      }
      onDelete={onDelete}
    />
  );
};

export default CustomChip;
