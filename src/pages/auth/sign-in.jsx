import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Check if the password contains the keyword "fail"
    if (password.includes("fail")) {
      setError("Invalid username or password.");
      return; // Stop further execution
    }

    try {
      // Use the provided mock server URL
      const response = await fetch(
        "https://json-placeholder.mock.beeceptor.com/login", 
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log("response", data);

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      navigate("/dashboard/home"); // Redirect to dashboard

    } catch (err) {
      setError(err.message || "Failed to connect to server");
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your credentials to Sign In
          </Typography>
        </div>
        
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Typography color="red" className="mt-2">
              {error}
            </Typography>
          )}

          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
      
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;