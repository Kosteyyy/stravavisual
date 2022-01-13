export default function reducer(state, action) {
    switch (action.type) {
        case "SET_QUERY_DATES":
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    before: action.payload.before,
                    after: action.payload.after
                }
            }
        case "SET_QUERY_TYPE":
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    type: action.payload.type,
                }
            }
        case "SET_KEY_FIELD":
            return {
                ...state,
                keyField: action.payload
            }
        case "SET_TARGET_FIELD":
            return {
                ...state,
                targetField: action.payload
            }
        default: 
            return state;
    }
}