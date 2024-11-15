import axiosUtils from "./AxiosUtils";

export const forgotPassword = (forgotPassword) => {
  return axiosUtils.post("/forgot-password/ForgotPassword", forgotPassword, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const resetPassword = (resetPassword) => {
  return axiosUtils.post("/forgot-password/ResetPassword", resetPassword, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const ChangePassword = (changePasswordData) => {
  return axiosUtils.post("/Account/VerifyPassword", changePasswordData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const ChangeProfileAPI = (userId, updatedProfile) => {
  return axiosUtils.post(`/user/update-profile?id=${userId}`, updatedProfile, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const GetProfileAPI = (userId) => {
  return axiosUtils.get(`/user/Profile?userId=${userId}`);
};
