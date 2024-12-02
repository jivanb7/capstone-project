const LOAD_POSTS = 'LOAD_POSTS';
const LOAD_SINGLE_POST = 'LOAD_SINGLE_POST';
const RESET_SINGLE_POST = 'RESET_SINGLE_POST';
const LOAD_USER_POSTS = 'LOAD_USER_POSTS';
const CREATE_POST = 'CREATE_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

export const loadSinglePost = (post) => ({
  type: LOAD_SINGLE_POST,
  post,
});

export const resetSinglePost = () => ({
  type: RESET_SINGLE_POST,
});

export const loadUserPosts = (posts) => ({
  type: LOAD_USER_POSTS,
  posts,
});

const createPostAction = (post) => ({
  type: CREATE_POST,
  payload: post,
});

export const updatePostAction = (post) => ({
  type: UPDATE_POST,
  payload: post,
});

const deletePostAction = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const fetchPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts');
  if (response.ok) {
    const data = await response.json();
    dispatch(loadPosts(data));
  } else {
    console.error('Failed to fetch posts');
  }
};

export const fetchSinglePost = (postId) => async (dispatch) => {
  dispatch(resetSinglePost()); 
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSinglePost(data));
  } else {
    console.error('Failed to fetch post details');
  }
};

export const fetchUserPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/current');
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserPosts(data));
  } else {
    console.error('Failed to fetch user posts');
  }
};

export const createPost = (postData) => async (dispatch) => {
  const response = await fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(createPostAction(post)); 
    return post;
  } else {
    const errorData = await response.json();
    return errorData; 
  }
};

export const updatePost = ({ postId, content }) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (response.ok) {
    const updatedPost = await response.json();
    dispatch(updatePostAction(updatedPost)); 
    return updatedPost;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deletePostAction(postId));
    return { message: `Post ${postId} deleted successfully.` };
  } else {
    const errorData = await response.json();
    return errorData;
  }
};



const initialState = { allPosts: [], singlePost: null, userPosts: [] };

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, allPosts: action.posts };
    case LOAD_SINGLE_POST:
      return { ...state, singlePost: action.post };
    case LOAD_USER_POSTS:
      return { ...state, userPosts: action.posts };
    case CREATE_POST:
      return {...state, allPosts: [action.payload, ...state.allPosts],};
    case UPDATE_POST:
      return {...state, allPosts: state.allPosts.map((post) => post.id === action.payload.id ? action.payload : post), userPosts: state.userPosts.map((post) => post.id === action.payload.id ? action.payload : post),};
    case DELETE_POST:
      return {...state, allPosts: state.allPosts.filter((post) => post.id !== action.payload), userPosts: state.userPosts.filter((post) => post.id !== action.payload),};
    default:
      return state;
  }
}

