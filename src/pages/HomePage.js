import { useEffect, useContext, useState } from "react";
import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries.js";
import { ListContext } from "../App.js";
import { Link } from "react-router-dom";

function HomePage() {
  const { searchStorage, dateStorage, statusStorage } = localStorage;
  const checkKey = (key, comparison) => {
    const pair = key === undefined ? comparison : key;
    return pair;
  };
  const { dispatch, state } = useContext(ListContext);
  const [searchString, setSearchString] = useState(checkKey(searchStorage, ""));
  const [status, setSearchStatus] = useState(checkKey(statusStorage, null));
  const [date, setDateStatus] = useState(checkKey(dateStorage, null));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);

  const { homepage } = state;

  useEffect(() => {
    const { event } = window;
    const isPopped = event && event.type !== "popstate";
    isPopped && fetchNotes();
  }, [searchString, status, date]);

  async function fetchNotes() {
    try {
      setLoading(true);
      const filter = {
        and: {
          name: { contains: searchString },
        },
      };
      status !== null &&
        Object.assign(filter.and, { completed: { eq: status } });

      date !== null &&
        Object.assign(filter.and, { createdAt: { contains: date } });

      const notesData = await API.graphql({
        query: listNotes,
        variables: { filter: filter },
      });
      dispatch({
        type: "SET_NOTES",
        notes: notesData.data.listNotes.items,
      });
      setLoading(false);
    } catch (err) {
      dispatch({ type: "ERROR" });
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          padding: "10px",
        }}
      >
        <div>
          <label htmlFor="search">search: </label>
          <input
            style={{ WebkitAppearance: "searchfield-cancel-button" }}
            type="search"
            placeholder="...title"
            defaultValue={searchString}
            onChange={(e) => {
              clearTimeout(timer);
              const { value } = e.currentTarget;
              const newTimer = setTimeout(() => {
                localStorage.setItem("searchStorage", value);
                setSearchString(value);
              }, 500);

              setTimer(newTimer);
            }}
          />
        </div>
        <div>
          <select
            style={{ height: "100%" }}
            defaultValue={status}
            name="status"
            onChange={(e) => {
              const pointer = { status: null, false: false, true: true };
              const data = pointer[e.currentTarget.value];
              data === null
                ? localStorage.removeItem("statusStorage")
                : localStorage.setItem("statusStorage", data);
              setSearchStatus(data);
            }}
          >
            <option>status</option>
            <option value="false">incomplete</option>
            <option value="true">completed</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            defaultValue={date}
            onChange={(e) => {
              const { value } = e.currentTarget;
              localStorage.setItem("dateStorage", value);
              setDateStatus(value);
            }}
          />
        </div>
      </form>
      <hr />
      {homepage.notes.length > 0 ? (
        homepage.notes.map((note) => {
          const date = new Date(note.createdAt);
          return (
            <div key={note.id} style={{ opacity: loading ? "0.5" : "1" }}>
              <h2>
                <Link to={`/list-item/${note.id}`}>{note.name}</Link>{" "}
              </h2>
              <p>{note.description}</p>
              <p>{date.toLocaleString()}</p>
              <p>completed: {!note.completed ? "not yet" : "done"}</p>
            </div>
          );
        })
      ) : (
        <h1>no data</h1>
      )}
    </div>
  );
}

export default HomePage;
