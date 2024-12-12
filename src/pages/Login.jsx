function Login() {
  return <div>Login</div>;
  const { signUpWithGoogle } = useSignup();
  return (
    <div className="h-screen grid place-items-center">
      <button onClick={signUpWithGoogle} className="btn btn-primary">
        Google
      </button>
    </div>
  );
}

export default Login;
