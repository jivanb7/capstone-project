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
    dispatch(fetchUserComments());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Your Comments</h1>

      {userComments.length === 0 ? (
        <p>You have not made any comments yet.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userComments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "15px", width: "100%" }}>
              <p><strong>Comment:</strong> {comment.description}</p>

              <OpenModalButton
                buttonText="Update Comment"
                modalComponent={<UpdateCommentFormModal commentId={comment.id} currentDescription={comment.description} />}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
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
                  marginLeft: "5px"
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommentsPage;
