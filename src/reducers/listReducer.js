export const initialState = {
  homepage: {
    notes: [],
    error: false,
  },
  listitem: {
    note: {},
    error: false,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_NOTES":
      const { notes } = action;
      return {
        ...state,
        homepage: {
          ...state.homepage,
          notes: notes,
          error: false,
        },
      };

    case "SET_NOTE":
      const { note } = action;
      return {
        ...state,
        listitem: { note: note, error: false },
      };
    case "NOTE_ERROR":
      return {
        ...state,
        listitem: {
          note: {},
          error: true,
        },
      };
    default:
      return state;
  }
}
