import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>README</h1>
      <div style={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Bebas Neue",
    fontSize: "82px", 
    fontWeight: "bold",
    color: "var(--main-color)", 
    marginBottom: "32px", 
    letterSpacing: "2px", 
  },
  formContainer: {
    backgroundColor: "var(--bg-color)",
    padding: "48px 64px", 
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
};

export default LoginPage;
