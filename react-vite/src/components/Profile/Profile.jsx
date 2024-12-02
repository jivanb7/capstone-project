import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../redux/postReducer";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; 
import PostForm from "../PostFormModal/PostFormModal"; 
import UpdatePostFormModal from "../UpdatePostFormModal/UpdatePostFormModal";
import DeletePostModal from "../DeletePostModal/DeletePostModal";

const Profile = () => {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.posts.userPosts);
  const user = useSelector((state) => state.session.user); 

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts()); 
    }
  }, [dispatch, user]); 

  return (
    <div className="profile-page" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Your Posts</h1>

      {user && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <OpenModalButton
            buttonText="Create a Post"
            modalComponent={<PostForm />}
            style={{background: "green", color: "white", borderRadius: "5px", height: "35px"}}
          />
        </div>
      )}

      {user ? (
        userPosts.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            You have not made any posts yet.
          </p>
        ) : (
          userPosts.map((post) => {
            const previewImage = post.images?.find((img) => img.preview_image);

            return (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "50px",
                }}
              >
                <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {previewImage && (
                    <img
                      src={previewImage.url}
                      alt={`Preview for ${post.content}`}
                      style={{
                        maxWidth: "100%",
                        minWidth: "99%",
                        minHeight: "299px",
                        maxHeight: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <div style={{ marginTop: "10px" }}>
                    <p>{post.content}</p>
                  </div>
                </Link>

                {user.id === post.user_id && (
                  <div style={{ marginTop: "10px" }}>
                    <OpenModalButton
                      buttonText="Update Post"
                      modalComponent={<UpdatePostFormModal postId={post.id} content={post.content} />}
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                        padding: "8px 20px",
                        cursor: "pointer",
                      }}
                    />
                    <OpenModalButton
                      buttonText="Delete Post"
                      modalComponent={<DeletePostModal postId={post.id} />}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "5px",
                        padding: "8px 20px",
                        cursor: "pointer",
                        marginLeft: "5px"
                      }}
                    />
                  </div>
                )}

              </div>
            );
          })
        )
      ) : (
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          You have not made any posts yet. <strong>Login</strong> or <strong>Sign Up</strong> to start sharing today!
        </p>
      )}
    </div>
  );
};

export default Profile;
