import React from "react";
import {
  Card,
  CardContent,
  Typography,
  // CardActions,
  // Button,
} from "@material-ui/core";

const NoteCard = ({ id, title, description, bgColor, onEdit, onDelete }) => {
  return (
    <Card style={{ backgroundColor: bgColor }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button
          size="small"
          variant="contained"
          style={{ backgroundColor: "#FFFFFF" }}
          onClick={() => onEdit(id, title, description)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default NoteCard;
