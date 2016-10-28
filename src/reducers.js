
export function entries(state=[], action) {

    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                {
                    _id : id(),
                    completed: false,
                    text: action.text,
                },
                ...state
            ]

        case 'INSERT_ENTRY':
            return [
                action.entry,
                ...state
            ]

        case 'UPDATE_ENTRY':
            return state.map(entry =>
                entry._id === action.entry._id ?
                    action.entry :
                    entry
            )

        default:
            return state;
    }
}

function id() {
    return Math.random().toString(36).substring(7);
}