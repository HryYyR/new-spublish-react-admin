import { legacy_createStore } from "redux";

const initialState = {}

const reducer = (prevState, action) => {
    return prevState
}


const store = legacy_createStore(reducer);

export default store;