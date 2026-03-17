import api from "../api/axois.jsx";

export default async function signupService(name, email, password) {
  try {
    const payload = {
      fullName: name,
      email,
      passwordHash: password,
      passwordhash: password
    };

    const response = await api.post("/User/signup", payload);

    return response.data;
  } catch (error) {
    console.error("Signup service error:", error);
    throw error;
  }
}
