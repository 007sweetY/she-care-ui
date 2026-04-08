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

  if (response.data?.jwtToken) {
    localStorage.setItem("token", response.data.jwtToken);
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
