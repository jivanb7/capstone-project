import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/commentReducer";
import { useModal } from "../../context/Modal";

const DeleteCommentModal = ({ commentId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const result = await dispatch(deleteComment(commentId));
    if (result?.message) {
      closeModal(); 
    }
  };

  return (
    <div className="delete-comment-modal">
      <h3 style={{ padding: "0 10px" }}>Are you sure you want to delete this comment?</h3>
      <div style={{ display: "flex", justifyContent: "space-around", height: "40px", paddingBottom: "10px" }}>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            width: "100px",
          }}
        >
          Delete
        </button>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            width: "100px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
