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
