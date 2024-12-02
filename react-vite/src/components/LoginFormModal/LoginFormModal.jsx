import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validation checks
    if (!email) {
      errors.email = "Email is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // If errors exist, set them
      return;
    }

    // If no validation errors, dispatch login
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse); // If the server returns errors, set them
    } else {
      closeModal(); // Close modal on success
    }
  };

  // Handle demo login for guest user
  const handleDemoLogin = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password",
    };
    const serverResponse = await dispatch(thunkLogin(demoUser));

    if (serverResponse) {
      setErrors(serverResponse); // If the server returns errors, set them
    } else {
      closeModal(); // Close modal on success
    }
  };

  return (
    <>
      <h1 style={{textAlign: "center"}}>Log In</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <label style={{display: "flex", flexDirection: "column"}}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "250px", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </label>
        {errors.email && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors.email}</p>}

        <label style={{display: "flex", flexDirection: "column"}}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "250px", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </label>
        {errors.password && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{errors.password}</p>}

        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "200px", fontSize: "16px", alignSelf: "center", marginRight: "40px" }}>
          Log In
        </button>
      </form>

      <button
        className="login-demo-user"
        type="button"
        data-testid="demo-user-login"
        onClick={handleDemoLogin}
        style={{
          marginLeft: "55px",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "200px",
          fontSize: "16px",
          alignSelf: "center",
          marginBottom: "10px"
        }}
      >
        Demo User
      </button>

    </>
  );
}

export default LoginFormModal;
