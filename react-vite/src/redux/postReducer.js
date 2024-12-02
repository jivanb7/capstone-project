const LOAD_POSTS = 'LOAD_POSTS';
const LOAD_SINGLE_POST = 'LOAD_SINGLE_POST';

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

export const loadSinglePost = (post) => ({
  type: LOAD_SINGLE_POST,
  post,
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
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSinglePost(data));
  } else {
    console.error('Failed to fetch post details');
  }
};

const initialState = { allPosts: [], singlePost: null };

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, allPosts: action.posts };
    case LOAD_SINGLE_POST:
      return { ...state, singlePost: action.post };
    default:
      return state;
  }
}
