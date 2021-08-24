import React from "react";
import { TextField } from "@material-ui/core";

const SearchField = ({ onSearch }) => {
  return (
    <>
      <TextField
        placeholder="Search Notes"
        style={{ marginBottom: "1.5rem" }}
        fullWidth
        variant="outlined"
        onChange={(e) => onSearch(e.target.value)}
        required
      />
    </>
  );
};

export default SearchField;
