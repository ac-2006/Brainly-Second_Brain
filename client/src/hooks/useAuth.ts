import { useState } from "react";
import { authService } from "../services/api";
import { setToken, setUser } from "../utils/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(username, email, password);
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        return response;
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signin(email, password);
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        return response;
      } else {
        setError(response.message || "Signin failed");
      }
    } catch (err) {
      setError("An error occurred during signin");
    } finally {
      setLoading(false);
    }
  };

  return { signup, signin, loading, error };
};
