import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/postReducer';
import { Link } from 'react-router-dom';

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div 
      className="grid-layout" 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 3fr 1fr", 
        gap: "20px", 
        padding: "20px" 
      }}
    >
      <div className="left-section"></div>

      <div className="main-content">
        {posts.map((post) => {
          const previewImage = post.images?.find((img) => img.preview_image);

          return (
            <div 
              key={post.id} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: "100px" 
              }}
            >
              <Link 
                to={`/post/${post.id}`} 
                style={{ cursor: "pointer", textDecoration: 'none', color: 'inherit' }}
              >
                {previewImage && (
                  <img
                    src={previewImage.url}
                    alt={`Preview for ${post.content}`}
                    style={{ maxWidth: "100%", height: "600px", borderRadius: "30px" }}
                  />
                )}
                <div style={{ display: "flex", justifyContent: "flex-start", width: "480px", marginTop: "10px" }}>
                  <div style={{ marginRight: "5px" }}>@{post.username}: </div>
                  <div>{post.content}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="right-section"></div>
    </div>
  );
};

export default Post;
