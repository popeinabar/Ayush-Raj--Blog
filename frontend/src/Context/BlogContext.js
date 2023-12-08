// BlogContext.js
import { createContext, useReducer } from "react";

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.payload,
        loading: false, // Set loading to false once blogs are fetched
      };
    case 'CREATE_BLOG':
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter((w) => w._id !== action.payload._id),
      };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? { ...blog, ...action.payload } : blog
        ),
      };
    case 'FETCH_BLOGS_START':
      return {
        ...state,
        loading: true, // Set loading to true when fetching starts
      };
    case 'FETCH_BLOGS_END':
      return {
        ...state,
        loading: false, // Set loading to false when fetching ends
      };
    default:
      return state;
  }
};

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: null,
    loading: true, // Initial loading state
  });

  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
