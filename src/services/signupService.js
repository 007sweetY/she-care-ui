import api from "./api";

/* ================= SIGNUP ================= */

export async function signupService(
  fullName,
  email,
  password,
  confirmPassword
) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const payload = {
    fullName,
    email,
    passwordHash: password
  };

  const response = await api.post("/User/signup", payload);

  return response.data;
}

/* ================= VERIFY OTP ================= */

export async function verifyOtpService(email, otp) {
  const response = await api.post("/User/verify-otp", {
    email,
    otp
  });

  return response.data;
}


/* ================= LOGIN ================= */

export async function loginService(email, password) {
  const response = await api.post("/User/login", {
    email,
    password
  });

  const token =
    response?.data?.jwtToken ??
    response?.data?.token ??
    response?.data?.accessToken ??
    response?.data?.data?.jwtToken ??
    response?.data?.data?.token ??
    response?.data?.data?.accessToken ??
    null;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
}


/* ================= COMPLETE PROFILE ================= */

export async function completeProfile(profileData) {
  const response = await api.post(
    "/User/complete-profile",
    profileData
  );

  return response.data;
}
