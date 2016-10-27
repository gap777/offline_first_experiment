
export function simpleReducer(state=[], action) {

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
            break;

    }
    return state;
}

function id() {
    return Math.random().toString(36).substring(7);
}