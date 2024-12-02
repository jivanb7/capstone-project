import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (password !== confirmPassword) {
      errors.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }

    if (!email) {
      errors.email = "Email is required.";
    }

    if (!username) {
      errors.username = "Username is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no validation errors, dispatch signup
    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse); // If the server returns errors, set them
    } else {
      closeModal(); // Close modal on success
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "250px",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        {errors.email && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {errors.email}
          </p>
        )}

        <label style={{ display: "flex", flexDirection: "column" }}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "250px",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        {errors.username && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {errors.username}
          </p>
        )}

        <label style={{ display: "flex", flexDirection: "column" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "250px",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        {errors.password && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {errors.password}
          </p>
        )}

        <label style={{ display: "flex", flexDirection: "column" }}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "250px",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {errors.confirmPassword}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "200px",
            fontSize: "16px",
            alignSelf: "center",
            marginRight: "40px",
          }}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
