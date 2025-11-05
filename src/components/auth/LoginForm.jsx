import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await login(email, password);
    if (isSuccess) {
      navigate("/kt_3team_project_2025");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        required
      />

      <div style={styles.linkContainer}>
        <a href="#" style={styles.link}>아이디 찾기</a>
        <a href="#" style={styles.link}>비밀번호 찾기</a>
        <a href="#" style={styles.link}>회원가입</a>
      </div>

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "500px",
    height: "300px",
  },
  input: {
    width: "500px",
    height: "50px",
    marginBottom: "45px",
    borderRadius: "4px",
    padding: "0 10px",
    fontSize: "14px",
    boxShadow: "0 0 2px rgba(0,0,0,0.2)",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "500px",
    marginBottom: "20px",
    marginTop: "20px"
  },
  link: {
    fontSize: "16px",
    color: "var(--main-color)",
    textDecoration: "none",
  },
  button: {
    width: "500px",
    height: "45px",
    backgroundColor: "var(--main-color)", 
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "13px",
  },
};

export default LoginForm;
