import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSinglePost } from '../../redux/postReducer';
import { addComment } from '../../redux/commentReducer';
import { FaComment } from 'react-icons/fa'; 

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.singlePost);
  const user = useSelector((state) => state.session?.user || null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post?.images?.length) {
      const previewIndex = post.images.findIndex((img) => img.preview_image);
      setCurrentImageIndex(previewIndex >= 0 ? previewIndex : 0);
    }
  }, [post]);

  useEffect(() => {
    if (user) {
      setError(null); 
    }
  }, [user]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  const currentImage = post.images?.[currentImageIndex];
  const hasMultipleImages = post.images?.length > 1;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("To leave a comment, Log-In or Sign Up.");
      return;
    }

    if (comment.trim()) {
      const newComment = await dispatch(addComment(postId, comment));
      console.log("Submitting comment:", { postId, comment });
      if (newComment) {
        setComment("");
        setError(null);
      }
      dispatch(fetchSinglePost(postId));
    }
  };

  return (
    <div
      className="grid-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        gap: "20px",
        padding: "20px",
        marginBottom: "45px"
      }}
    >
      <div className="follow"></div>

      <div className="post-detail-page">
        <div>
          {currentImage && (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={currentImage.url}
                alt={`Image for ${post.content}`}
                style={{
                  maxWidth: "100%",
                  height: "600px",
                  borderRadius: "30px",
                }}
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                  >
                    &#8592;
                  </button>

                  <button
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>
          )}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                style={{
                  width: "70%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                <FaComment style={{ marginRight: "8px" }} />
                Comment
              </button>
            </form>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "center",}}>
              <div style={{ marginRight: "5px"}}> <strong> @{post.post.username}:</strong></div>
              <div><strong>{post.post.content}</strong></div>
            </div>
          </div>

          <div>
            {post.comments?.length === 0 ? (
              <p style={{textAlign: "center"}}>No comments yet.</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id}>
                  <div style={{ display: "flex", justifyContent: "center", }}>
                    <div style={{ marginRight: "5px" }}>@{comment.username}:</div>
                    <div>{comment.description}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="like"></div>
    </div>
  );
};

export default PostDetail;
