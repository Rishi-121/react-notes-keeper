import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import NoteCard from "./components/NoteCard";
import FormDialog from "./components/FormDialog";
import SearchField from "./components/SearchField";
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
  const [defaultFlag, setDefaultFlag] = useState(false);

  const handleAddNote = (title, description) => {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      bgColor: randomColor({ luminosity: "light", alpha: 0.5 }),
    };

    const newNotesData = notes.concat(newNote);

    localStorage.setItem("notes", JSON.stringify(newNotesData));

    setDefaultFlag(!defaultFlag);
  };

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    setNotes(notesData ? notesData : []);
  }, [defaultFlag]);

  const handleEditNote = (id, modifiedTitle, modifiedDescription) => {
    const newNotesData = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: modifiedTitle,
          description: modifiedDescription,
        };
      } else {
        return note;
      }
    });

    localStorage.setItem("notes", JSON.stringify(newNotesData));

    setDefaultFlag(!defaultFlag);
  };

  const handleDeleteNote = (id) => {
    const newNotesData = notes.filter((note) => note.id !== id);

    localStorage.setItem("notes", JSON.stringify(newNotesData));

    setDefaultFlag(!defaultFlag);
  };

  const handleSearch = (searchKeyword) => {
    console.log(searchKeyword);
  };

  return (
    <>
      <Container maxWidth="md" className={classes.noteCardContainer}>
        {notes.length > 0 && <SearchField onSearch={handleSearch} />}
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
