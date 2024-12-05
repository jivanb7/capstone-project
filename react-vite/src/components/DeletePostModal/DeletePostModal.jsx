import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/postReducer";
import { useModal } from "../../context/Modal";

const DeletePostModal = ({ postId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const result = await dispatch(deletePost(postId));
    if (result?.message) {
      closeModal(); // Close modal if successful
    }
  };

  return (
    <div className="delete-post-modal">
      <h3 style={{padding: "0 10px"}}>Are you sure you want to delete this post?</h3>
      <div style={{ display: "flex", justifyContent: "space-around", height: "40px", paddingBottom: "10px" }}>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", width: "100px", cursor: "pointer" }}
        >
          Delete
        </button>
        <button
          onClick={closeModal}
          style={{ backgroundColor: "gray", color: "white", padding: "10px", borderRadius: "5px", width: "100px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
