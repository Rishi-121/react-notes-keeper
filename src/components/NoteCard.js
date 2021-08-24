import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  textField: {
    margin: "1rem 0",
  },
  dialogActions: {
    marginBottom: "1.5rem",
  },
}));

const NoteCard = ({ id, title, description, bgColor, onEdit, onDelete }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [modifiedTitle, setModifiedTitle] = useState(title);
  const [modifiedDescription, setModifiedDescription] = useState(description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            className={classes.textField}
            label="Title"
            value={modifiedTitle}
            onChange={(e) => setModifiedTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            className={classes.textField}
            multiline
            rows={4}
            label="Description"
            value={modifiedDescription}
            onChange={(e) => setModifiedDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => {
                  onEdit(id, modifiedTitle, modifiedDescription);
                  handleClose();
                }}
              >
                Save Note
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      
      <Card style={{ backgroundColor: bgColor }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={handleClickOpen}
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
        </CardActions>
      </Card>
    </>
  );
};

export default NoteCard;
