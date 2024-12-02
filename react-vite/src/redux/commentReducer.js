const CREATE_COMMENT = 'CREATE_COMMENT';
const LOAD_USER_COMMENTS = "LOAD_USER_COMMENTS";
const SET_COMMENT_ERROR = "SET_COMMENT_ERROR";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

export const loadUserComments = (comments) => ({
  type: LOAD_USER_COMMENTS,
  comments,
});

export const setCommentError = (error) => ({
  type: SET_COMMENT_ERROR,
  error,
});

export const updateComment = (updatedComment) => ({
  type: UPDATE_COMMENT,
  updatedComment,
});

export const addComment = (postId, description) => async (dispatch) => {
  if (!description || description.trim() === "") {
    dispatch(setCommentError("Comment cannot be empty"));
    return null;
  }

  const response = await fetch(`/api/comments/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (response.ok) {
    const newComment = await response.json();
    dispatch(createComment(newComment));
    dispatch(setCommentError(null)); 
    return newComment;
  } else {
    const error = await response.json();
    console.error(error);
    dispatch(setCommentError(error.message || "Failed to post comment"));
    return null;
  }
};

export const fetchUserComments = () => async (dispatch) => {
  const response = await fetch("/api/comments/current");

  if (response.ok) {
    const comments = await response.json();
    dispatch(loadUserComments(comments));
  } else {
    console.error("Failed to load user comments");
  }
};

export const editComment = (commentId, description) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(updateComment(updatedComment)); 
    return updatedComment;
  } else {
    const error = await response.json();
    console.error(error);
    dispatch(setCommentError(error.message || "Failed to update comment"));
    return null;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch({ type: DELETE_COMMENT, commentId });
  } else {
    const error = await response.json();
    console.error(error);
    return { error: error.message || "Failed to delete comment" };
  }
};

const initialState = {
  userComments: [],
  error: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, userComments: [...state.userComments, action.comment], error: null };
    case LOAD_USER_COMMENTS:
      return { ...state, userComments: action.comments };
    case UPDATE_COMMENT:
      return {
        ...state,
        userComments: state.userComments.map((comment) =>
          comment.id === action.updatedComment.id ? action.updatedComment : comment
        ),
        error: null,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        userComments: state.userComments.filter((comment) => comment.id !== action.commentId),
        error: null,
      };
    case SET_COMMENT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
