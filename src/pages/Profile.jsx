import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button, Input } from "antd";

import { GetUserId } from "../utils/UserUtil";
import { ChangePassword, ChangeProfileAPI, GetProfileAPI } from "../utils/CRUD";

const Profile = () => {
  const [idUser, setIdUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [securityStampHash, setSecurityStampHash] = useState("");
  const [nation, setNation] = useState("");

  const [originalProfile, setOriginalProfile] = useState({});

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await GetProfileAPI(GetUserId());
        const data = response.data;
        setIdUser(GetUserId());
        setFullName(data.FullName);
        setEmail(data.Email);
        setBirthDate(data.BirthDate);
        setProvince(data.Province);
        setCity(data.City);
        setPasswordHash(data.PasswordHash);
        setSecurityStampHash(data.SecurityStampHash);
        setNation(data.Nation);
        setOriginalProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSaveChanges = () => {
    const updatedProfile = {};

    if (fullName !== originalProfile.FullName)
      updatedProfile["FullName"] = fullName;
    if (email !== originalProfile.Email) updatedProfile["Email"] = email;
    if (birthDate !== originalProfile.BirthDate)
      updatedProfile["BirthDate"] = birthDate;
    if (province !== originalProfile.Province)
      updatedProfile["Province"] = province;
    if (city !== originalProfile.City) updatedProfile["City"] = city;

    if (passwordHash !== originalProfile.PasswordHash)
      updatedProfile["PasswordHash"] = passwordHash;
    if (securityStampHash !== originalProfile.SecurityStampHash)
      updatedProfile["SecurityStampHash"] = securityStampHash;
    if (nation !== originalProfile.Nation) updatedProfile["Nation"] = nation;

    if (Object.keys(updatedProfile).length === 0) {
      console.log("No changes detected.");
      return;
    }

    // Convert to proper JSON format before sending
    const payload = JSON.stringify(updatedProfile);

    ChangeProfileAPI(GetUserId(), payload)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        alert("Profile updated!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Error updating profile:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleChangePassword = async () => {
    try {
      const passwordChangeData = {
        IdUser: idUser,
        PasswordHash: currentPassword,
        newPassword: newPassword,
      };

      ChangePassword(passwordChangeData)
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          alert("Password updated successfully!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Current password false!");
          console.error(
            "Error updating password:",
            error.response ? error.response.data : error.message
          );
        });
    } catch (error) {
      console.error("Error comparing passwords:", error);
      alert("There was an error verifying your password. Please try again.");
    }
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
  };
  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-800">Edit Profile</h2>
        <p className="text-sm text-gray-500">You may also edit your profile</p>
      </div>

      <div className="flex gap-8">
        {/* Edit Profile Section */}
        <div className="flex-1 rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Edit Profile
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">
                Full Name *
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Email Address *
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="rounded-lg"
                disabled
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700">
                  Birth Date
                </label>
                <Input
                  type="date"
                  value={birthDate.split("T")[0]}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700">
                  Province
                </label>
                <Input
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Province"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700">City</label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="rounded-lg"
                />
              </div>
            </div>
            <Button
              type="primary"
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="w-1/3 rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Change Password
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">
                Current Password
              </label>
              <Input.Password
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full rounded-lg"
                />
                <span
                  className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                  onClick={handleToggleNewPasswordVisibility}
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full rounded-lg"
                />
                <span
                  className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                  onClick={handleToggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <Button
              type="primary"
              className="w-full bg-yellow-500 hover:bg-yellow-600"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
