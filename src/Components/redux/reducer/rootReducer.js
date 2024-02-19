import { combineReducers } from "redux";
import { productsReducer, usersReducer } from "./reducer"; // Update the import

const rootReducer = combineReducers({
  users: usersReducer, // Use 'users' instead of 'posts'
  products: productsReducer,
  // Add other reducers if you have them
});

export default rootReducer;
