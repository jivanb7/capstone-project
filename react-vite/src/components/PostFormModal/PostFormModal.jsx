import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createPost, fetchUserPosts } from '../../redux/postReducer'; 

const PostFormModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];
    
    if (!content || content.trim() === '') {
      validationErrors.push('Content is required.');
    }
  
    if (!previewImage || previewImage.trim() === '') {
      validationErrors.push('Preview image is required.');
    } else if (!/\.(jpg|jpeg|png)$/i.test(previewImage)) {
      validationErrors.push('Preview image must be a valid image URL ending in .jpg, .jpeg, or .png.');
    }
  
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const postData = {
      content,  
      url: previewImage, 
    };
  
    const result = await dispatch(createPost(postData));
  
    if (result?.error) {
      setErrors([result.error]); 
    } else {
        dispatch(fetchUserPosts());
        closeModal(); 
    }
  };

  return (
    <div className="post-form-modal">
      <h2 style={{textAlign: "center"}}>Create a New Post</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} style={{ color: 'red', textAlign: "center" }}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", minWidth: "399px", maxWidth: "400px", margin: "0 auto" }}>
        <label>Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          style={{ width: "100%", marginTop: "5px" }}
          placeholder='Write something interesting...'
        />

        <label style={{marginTop: "10px"}}>Preview Image URL</label>
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          placeholder="Enter a preview image URL"
          style={{width: "400px", marginTop: "5px"}}
        />

        <button style={{background: "blue", color: "white", height: "30px", width: "110px", marginTop: "10px", cursor: "pointer"}} type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostFormModal;
