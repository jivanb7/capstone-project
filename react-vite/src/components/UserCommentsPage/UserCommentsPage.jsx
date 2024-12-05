import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserComments } from "../../redux/commentReducer";
import UpdateCommentFormModal from "../UpdateCommentFormModal/UpdateCommentFormModal"; 
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";
import OpenModalButton from "../OpenModalButton";  

const UserCommentsPage = () => {
  const dispatch = useDispatch();
  const userComments = useSelector((state) => state.comments.userComments);

  useEffect(() => {
  }, [userComments]);

  useEffect(() => {
    dispatch(fetchUserComments());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Your Comments</h1>

      {userComments.length === 0 ? (
        <p>You have not made any comments yet.</p>
      ) : (
        <div style={{display: "grid", gridTemplateColumns: "1fr 3fr 1fr"}}>
        <div className="Left-Section" style={{width: "400px"}}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userComments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "15px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{textAlign: "center"}}><strong>Comment:</strong> {comment.description}</p>
              <div>
              <OpenModalButton
                buttonText="Update Comment"
                modalComponent={<UpdateCommentFormModal commentId={comment.id} currentDescription={comment.description} />}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  cursor: "pointer"
                }}
              />

              <OpenModalButton
                buttonText="Delete Comment"
                modalComponent={<DeleteCommentModal commentId={comment.id} />}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  cursor: "pointer"
                }}
              />
              </div>
            </div>
          ))}
        </div>
        <div className="Right-Section" style={{width: "400px"}}></div>
        </div>
      )}
    </div>
  );
};

export default UserCommentsPage;
