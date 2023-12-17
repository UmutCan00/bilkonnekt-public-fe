// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";

import { v4 } from "uuid";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function ProfilePage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [userData, setUserData] = useState({
    username: "",
    fullName: "Mert Terkuran",
    email: "",
    bio: "3. Sinif CS öğrencisi",
    rating: "Güvenilir",
    imageURL: "none",
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteUserEmail, setDeleteUserEmail] = useState("");
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const isBanned = session?.user?.isBanned;
  if (isBanned) router.push("/");
  let uploadedImageURL = "false";

  function ImageSpace() {
    return (
      <div className="imgSpace border rounded text-center">
        <img src={userData.imageURL} />
      </div>
    );
  }

  function UserInfo({ userData }) {
    return (
      <div
        className="card bg-custom1"
        style={{ width: "40rem", color: "#0B1356" }}
      >
        <h3 className=" text-center text-white" style={{ fontSize: "2rem" }}>
          UserName: {userData.username}
        </h3>
        <h3 className=" text-center text-white" style={{ fontSize: "2rem" }}>
          Email: {userData.email}
        </h3>
      </div>
    );
  }
  const handleConfirmPasswordChange = async () => {
    // Here you would send the currentPassword and newPassword to your backend for the password change operation
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);

    const response = await fetch(
      "http://localhost:3500/api/auth/changePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        },
        body: JSON.stringify({
          oldPass: currentPassword,
          newPass: newPassword,
          id: session?.user?._id,
        }),
      }
    );
    // Reset fields and hide the modal
    setCurrentPassword("");
    setNewPassword("");
    setShowChangePassword(false);
  };
  const handleDeleteUser = async () => {
    console.log("Email to delete:", deleteUserEmail);
    const response = await fetch("http://localhost:3500/api/auth/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: session?.user?._id,
      }),
    });
    setDeleteUserEmail("");
    setShowDeleteUser(false);
  };
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/auth/getProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: params.slug,
            }),
          }
        );
        const userDataResponse = await response.json();
        setUserData({
          username: userDataResponse.username,
          fullName: "Mert Terkuran",
          email: userDataResponse.email,
          bio: "3. Sinif CS öğrencisi",
          rating: "Güvenilir",
          imageURL: userDataResponse.imageURL,
        });
        ImageSpace();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleFetch();
  }, [token]);

  const handleSubmit = async () => {
    try {
      uploadedImageURL = await uploadImage();
    } catch (error) {
      console.log("firebase error: ", error);
    }
  };

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        uploadedImageURL = downloadURL;
        console.log("Image URL:", uploadedImageURL);
        alert("Image uploaded");
        return downloadURL;
      })
      .then(() => {
        fetch("http://localhost:3500/api/auth/updateImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageURL: uploadedImageURL,
          }),
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    console.log("uploadedImageURL: ", uploadedImageURL);
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row content d-flex bg-custom1">
          <div className="col-sm ">
            <div className="d-flex flex-row  ms-5">
              <div className="ms-5"></div>
              <div className="ms-5"></div>
              <div className="ms-5"></div>
              <div className="ms-5"></div>
              <div className="ms-5"></div>
              <div className="d-flex  mt-5">
                <ImageSpace image={imageUpload} />
              </div>
            </div>
            {session?.user?._id === params.slug && (
              <div className="d-flex justify-content-center ">
                <div
                  className="col-md-6 d-flex flex-column"
                  style={{ marginLeft: "120px" }}
                >
                  <label
                    htmlFor="avatar"
                    style={{ color: "white", padding: "10px" }}
                  >
                    Choose a profile picture:
                  </label>
                  <input
                    style={{ padding: "10px" }}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                      handleSubmit();
                    }}
                  />
                  <button
                    variant="primary"
                    class="btn btn-light"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-sm ">
            <div className="d-flex flex-column  mt-5">
              <div className="mt-5">
                <UserInfo userData={userData} />
              </div>
              <div className="mt-5">
                <button className="btn btn-primary m-2">
                  <i class="bi bi-envelope-fill"></i> Send Message
                </button>
                <button
                  className="btn btn-info m-2"
                  onClick={() => {
                    router.push("/marketplace/seller/" + params.slug);
                  }}
                >
                  <i class="bi bi-shop-window"></i> Go to Shop
                </button>
                {session?.user?._id === params.slug && (
                  <>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => setShowDeleteUser(true)}
                    >
                      <i class="bi bi-person-x-fill"></i> Delete User
                    </button>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => setShowChangePassword(true)}
                    >
                      <i class="bi bi-key-fill"></i> Change Password
                    </button>
                  </>
                )}
                {showDeleteUser && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setShowDeleteUser(false)}
                      >
                        &times;
                      </span>
                      <h2>Delete User</h2>
                      <input
                        type="email"
                        placeholder="Email"
                        value={deleteUserEmail}
                        onChange={(e) => setDeleteUserEmail(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%" }}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%" }}
                      />
                      <button
                        onClick={handleDeleteUser}
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "lightgray",
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
                {showChangePassword && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setShowChangePassword(false)}
                      >
                        &times;
                      </span>
                      <h2>Change Password</h2>
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%" }}
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%" }}
                      />
                      <button
                        onClick={handleConfirmPasswordChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "lightgray",
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {` 
        .bg-custom1 {
          background-color: #0B1356;
          
        }
          .row.content {
            height: 798px
          }
          .imgSpace{
            width: 500px;
            height: 500px;
            color: black;          
            border-radius: 50%;          
            background: white;
          }
          .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 30%;
            max-width: 400px;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default ProfilePage;
