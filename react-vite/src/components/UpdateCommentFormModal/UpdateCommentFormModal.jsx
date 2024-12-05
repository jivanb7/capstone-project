import { useDispatch } from "react-redux";
import { useState } from "react";
import { editComment } from "../../redux/commentReducer"; 
import { useModal } from "../../context/Modal";

const UpdateCommentFormModal = ({ commentId, currentDescription }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [updatedDescription, setUpdatedDescription] = useState(currentDescription);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updatedDescription === currentDescription) {
      closeModal();
      return;
    }

    if (!updatedDescription.trim()) {
      setError("Description is required.");
      return;
    }

    const result = await dispatch(editComment( commentId, updatedDescription ));

    if (result?.error) {
      setError(result.error);
    } else {
      closeModal(); 
    }
  };

  return (
    <div className="update-comment-form-modal">
      <h2 style={{textAlign: "center"}}>Update Your Comment</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{maxWidth: "430px", minWidth: "429px", height: "150px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label style={{marginLeft: "10px", textAlign: "left"}}>Description</label>
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          rows="4"
          style={{ minWidth: "399px", maxWidth: "400px", minHeight: "79px", maxHeight: "80px", marginLeft: "10px" }}
        />
        <button type="submit" style={{ background: "blue", color: "white", height: "35px", width: "150px", marginTop: "7px", cursor: "pointer"}}>
          Update Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentFormModal;
