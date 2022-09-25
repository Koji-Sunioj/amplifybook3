import { useContext } from "react";
import { ListContext } from "../App";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "aws-amplify";
import { getNote } from "../graphql/queries";

const ListItem = () => {
  const { itemId } = useParams();
  const { state, dispatch } = useContext(ListContext);
  const { note } = state.listitem;
  console.log(state);
  useEffect(() => {
    grabNote();
  }, [itemId]);

  const grabNote = async () => {
    try {
      const note = await API.graphql({
        query: getNote,
        variables: { id: itemId },
      });
      if (note.data.getNote === null) {
        throw Error();
      } else {
        dispatch({ type: "SET_NOTE", note: note.data.getNote });
      }
    } catch (error) {
      dispatch({ type: "NOTE_ERROR" });
    }
  };

  const validNote = note.id === itemId;
  return validNote ? (
    <div style={{ padding: "20px" }}>
      <h1>{note.name}</h1>
      <p>{note.description}</p>
      <p>{Date(note.createdAt)}</p>
      <p>completed: {note.completed ? "not yet" : "done"}</p>
      <p>id: {note.id}</p>
    </div>
  ) : (
    <h1>no data</h1>
  );
};

export default ListItem;
