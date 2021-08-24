import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import NoteCard from "./components/NoteCard";
import FormDialog from "./components/FormDialog";
import { v4 as uuidv4 } from "uuid";
import randomColor from "randomcolor";
import Masonry from "react-masonry-css";

const useStyles = makeStyles((theme) => ({
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  noteCardContainer: {
    padding: theme.spacing(6, 0, 8),
  },
}));

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const App = () => {
  const classes = useStyles();

  const [notes, setNotes] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleAddNote = (title, description) => {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      bgColor: randomColor({ luminosity: "light", alpha: 0.5 }),
    };

    const newNotesData = notes.concat(newNote);
    setNotes(newNotesData);

    localStorage.setItem("notes", JSON.stringify(newNotesData));

    setFlag(!flag);
  };

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    setNotes(notesData ? notesData : []);
  }, [flag]);

  const handleEditNote = (id, title, description) => {};

  const handleDeleteNote = (id) => {
    const newNotesData = notes.filter((note) => note.id !== id);
    setNotes(newNotesData);
    localStorage.setItem("notes", JSON.stringify(newNotesData));
    setFlag(!flag);
  };

  return (
    <>
      <Container maxWidth="md" className={classes.noteCardContainer}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.length === 0 ? (
            <Typography
              variant="h4"
              color="textSecondary"
              className={classes.text}
            >
              No Notes Available
            </Typography>
          ) : (
            notes.map((notes, index) => (
              <div key={index}>
                <NoteCard
                  {...notes}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
                />
              </div>
            ))
          )}
        </Masonry>
        <FormDialog onSubmit={handleAddNote} />
      </Container>
    </>
  );
};

export default App;
