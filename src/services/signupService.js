import api from "../api/axois.jsx";

export default async function signupService(name, email, password) {
  try {
    const payload = {
      fullName: name,
      email,
      PasswordHash: password
    };

    const response = await api.post("/User/signup", payload);

    // Store the JWT token if present
    if (response.data.jwtToken) {
      localStorage.setItem("token", response.data.jwtToken);
    }

    return response.data;
  } catch (error) {
    console.error("Signup service error:", error);
    throw error;
  }
}

export async function loginService(email, password) {
  try {
    const payload = {
      email,
      password
    };

    const response = await api.post("/User/login", payload);

    // Assuming the response contains a jwtToken
    if (response.data.jwtToken) {
      localStorage.setItem("token", response.data.jwtToken);
    }

    return response.data;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
}

export async function completeProfile(profileData) {
  try {
    const response = await api.post("/User/complete-profile", profileData);

    return response.data;
  } catch (error) {
    console.error("Complete profile error:", error);
    throw error;
  }
}