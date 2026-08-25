import api from "./axios";

export const loginUser = (loginData) => {
  return api.post("/auth/login", {
    email: loginData.email,
    password: loginData.password,
  });
};

export const registerUser = (registerData) => {
  return api.post("/auth/registration", {
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    contact: registerData.phone,
    password: registerData.password,
    confirmPassword: registerData.confirmPassword,
  });
};

export const verifyOtp = (email, otp) => {
  return api.post("/auth/verify-otp", {
    email: email,
    otp: Number(otp),
  });
};

export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", {
    email: email,
  });
};

export const verifyForgotOtp = (email, otp) => {
  return api.post("/auth/verify-forgot-otp", {
    email: email,
    otp: Number(otp),
  });
};

export const resetPassword = (email, newPassword, confirmPassword) => {
  return api.post("/auth/reset-password", {
    email: email,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
};

export const changePassword = (
  password,
  newPassword,
  ConfirmPassword
) => {
  const token = localStorage.getItem("token");

  return api.post( "/auth/change-password",
    {
      password: password,
      newPassword: newPassword,
      ConfirmPassword: ConfirmPassword,
    },
    {
      headers: { Authorization: `Bearer ${token}`, },
    }
  );
};