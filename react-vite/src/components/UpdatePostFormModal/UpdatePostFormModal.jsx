import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/postReducer"; 
import { useModal } from "../../context/Modal";

const UpdatePostFormModal = ({ postId, content }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [updatedContent, setUpdatedContent] = useState(content);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updatedContent === content) {
      closeModal();
      return;
    }

    if (!updatedContent.trim()) {
      setError("Content is required.");
      return;
    }

    const result = await dispatch(updatePost({ postId, content: updatedContent }));

    if (result?.error) {
      setError(result.error);
    } else {
      closeModal(); 
    }
  };

  return (
    <div className="update-post-form-modal">
      <h2 style={{textAlign: "center"}}>Update Your Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{maxWidth: "430px", minWidth: "429px", height: "130px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label style={{marginLeft: "10px", textAlign: "left"}}>Content</label>
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          rows="4"
          style={{ width: "400px", marginLeft: "10px" }}
        />
        <button type="submit" style={{ background: "blue", color: "white", height: "35px", width: "150px", marginTop: "7px"}}>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostFormModal;
