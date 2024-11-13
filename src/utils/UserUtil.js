import { jwtDecode } from "jwt-decode";

export const GetUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return null;
  }

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return decodedToken["sub"];
};

export const GetRoleUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return null;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
};
