"use client";
import Navbar from "../components/Navbar";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//change
const Admin = () => {
  //Table Selection
  const [selectedTable, setSelectedTable] = useState("users");
  //Search Items
  const [searchUser, setSearchUser] = useState("");
  const [searchClub, setSearchClub] = useState("");
  const [searchMarketplacePost, setSearchMarketplacePost] = useState("");
  const [searchSocialPost, setSearchSocialPost] = useState("");
  const [searchTicket, setSearchTicket] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //Panels
  const [showRolePanel, setShowRolePanel] = useState(false);
  const [showBanPanel, setShowBanPanel] = useState(false);
  const [showDeleteClubPanel, setShowDeleteClubPanel] = useState(false);
  const [showAddClubPanel, setShowAddClubPanel] = useState(false);
  const [showDeleteMarketplacePostPanel, setShowDeleteMarketplacePostPanel] =
    useState(false);
  const [showDeleteSocialPostPanel, setShowDeleteSocialPostPanel] =
    useState(false);
  //Selected x
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [selectedClubName, setSelectedClubName] = useState(null);
  const [selectedClubDescription, setSelectedClubDescription] = useState(null);
  const [selectedClubExecutiveID, setSelectedClubExecutiveID] = useState(null);
  const [selectedMarketplacePostId, setSelectedMarketplacePostId] =
    useState(null);
  const [selectedSocialPostId, setSelectedSocialPostId] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [social, setSocial] = useState([]);
  const [tickets, setTickets] = useState([]);

  const handleButtonClick = (tableName) => {
    setSelectedTable(tableName);
  };

  const openRolePanel = (userID) => {
    setSelectedUserId(userID);
    setShowRolePanel(true);
  };

  const closeRolePanel = () => {
    setSelectedUserId(null);
    setShowRolePanel(false);
  };

  const handleRoleChange = () => {
    console.log("selectedUserId: ", selectedUserId);
    console.log("selectedRole: ", selectedRole);
    try {
      fetch("http://localhost:3500/api/auth/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: selectedRole,
          studentId: selectedUserId,
        }),
      });
    } catch (error) {
      console.log("set role basarisiz");
    }
    closeRolePanel();
    window.location.reload();
  };

  const openBanPanel = (userID) => {
    setSelectedUserId(userID);
    setShowBanPanel(true);
  };

  const closeBanPanel = () => {
    setSelectedUserId(null);
    setShowBanPanel(false);
  };
  console.log("role", session?.user?.role);
  const isadmin = session?.user?.role == "Admin";
  const router = useRouter();
  if (!isadmin && session?.user?.role) router.push("/");

  const handleBan = () => {
    console.log("selectedUserId: ", selectedUserId);
    try {
      fetch("http://localhost:3500/api/auth/banStasusChange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: selectedUserId,
        }),
      });
    } catch (error) {
      console.log("set role basarisiz");
    }
    closeBanPanel();
    window.location.reload();
  };

  const openDeleteClubPanel = (clubID) => {
    setSelectedClubId(clubID);
    setShowDeleteClubPanel(true);
  };

  const closeDeleteClubPanel = () => {
    setSelectedClubId(null);
    setShowDeleteClubPanel(false);
  };

  const handleDeleteClub = () => {
    console.log(selectedClubId);
    /*try {
      fetch("http://localhost:3500/api/social/deleteClub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clubId: selectedClubId,
        }),
      });
    } catch (error) {
      console.log("delete club basarisiz");
    }*/
    closeDeleteClubPanel();
    window.location.reload();
  };

  const openAddClubPanel = () => {
    setShowAddClubPanel(true);
  };

  const closeAddClubPanel = () => {
    setSelectedClubName(null);
    setSelectedClubDescription(null);
    setSelectedClubExecutiveID(null);
    setShowAddClubPanel(false);
  };

  const handleAddClub = () => {
    if (
      !selectedClubName ||
      !selectedClubDescription ||
      !selectedClubExecutiveID
    ) {
      console.log("fill the fields");
    } else {
      fetch("http://localhost:3500/api/social/createClub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedClubName,
          executiveId: selectedClubExecutiveID,
          description: selectedClubDescription,
        }),
      });
      console.log(selectedClubName);
      console.log(selectedClubDescription);
      console.log(selectedClubExecutiveID);
      closeAddClubPanel();
      window.location.reload();
    }
  };

  const openDeleteMarketplacePostPanel = (marketplacePostID) => {
    setSelectedMarketplacePostId(marketplacePostID);
    setShowDeleteMarketplacePostPanel(true);
  };

  const closeDeleteMarketplacePostPanel = () => {
    setSelectedMarketplacePostId(null);
    setShowDeleteMarketplacePostPanel(false);
  };

  const handleDeleteMarketplacePost = () => {
    console.log(selectedMarketplacePostId);
    try {
      fetch("http://localhost:3500/api/product/deleteProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedMarketplacePostId,
        }),
      });
    } catch (error) {
      console.log("delete prod basarisiz");
    }
    closeDeleteMarketplacePostPanel();
    window.location.reload();
  };

  const openDeleteSocialPostPanel = (socialPostID) => {
    setSelectedSocialPostId(socialPostID);
    setShowDeleteSocialPostPanel(true);
  };

  const closeDeleteSocialPostPanel = () => {
    setSelectedSocialPostId(null);
    setShowDeleteSocialPostPanel(false);
  };

  const handleDeleteSocialPost = () => {
    console.log(selectedSocialPostId);
    try {
      fetch("http://localhost:3500/api/social/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: selectedSocialPostId,
        }),
      });
    } catch (error) {
      console.log("delete prod basarisiz");
    }
    closeDeleteSocialPostPanel();
    window.location.reload();
  };

  const handleTicket = (ticketID) => {
    try {
      fetch("http://localhost:3500/api/auth/handleTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticketId: ticketID,
        }),
      });
    } catch (error) {
      console.log("handle ticket basarisiz");
    }
    console.log(ticketID);
    window.location.reload();
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/auth/getUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchClubs = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/social/getClubs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClubs(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/product/getProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMarketplace(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/social/getSocialPosts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSocial(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTickets = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/auth/getTickets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchClubs();
    fetchProducts();
    fetchPosts();
    fetchTickets();
  }, [token]);

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
            width: "180px",
            height: "55px",
          }}
          onClick={() => handleButtonClick("users")}
        >
          Manage Users
        </button>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
            width: "180px",
            height: "55px",
          }}
          onClick={() => handleButtonClick("clubs")}
        >
          Manage Clubs
        </button>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
            width: "180px",
            height: "55px",
          }}
          onClick={() => handleButtonClick("marketplace")}
        >
          Manage Marketplace Posts
        </button>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
            width: "180px",
            height: "55px",
          }}
          onClick={() => handleButtonClick("social")}
        >
          Manage Social Posts
        </button>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
            width: "180px",
            height: "55px",
          }}
          onClick={() => handleButtonClick("tickets")}
        >
          Manage Tickets
        </button>
      </div>
      {selectedTable === "users" && (
        <div>
          <Form>
            <InputGroup>
              <FormControl
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search User by name or email"
              />
            </InputGroup>
          </Form>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "30px",
              backgroundColor: "gray",
              marginBottom: "20px",
            }}
          >
            Users
          </h1>
          <div style={{ overflowX: "auto", maxHeight: "600px" }}>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ width: "20%", padding: "8px" }}>ID</th>
                  <th style={{ width: "20%", padding: "8px" }}>Name</th>
                  <th style={{ width: "30%", padding: "8px" }}>Email</th>
                  <th style={{ width: "20%", padding: "8px" }}>Role</th>
                  <th style={{ width: "7%", padding: "8px" }}>Banned</th>
                  <th style={{ width: "30%", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {user._id}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {user.username}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {user.role}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {user.isBanned ? "Yes" : "No"}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {}
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginRight: "10px",
                          width: "90px",
                          height: "30px",
                        }}
                        onClick={() =>
                          (window.location.href = "/profilePage/" + user._id)
                        }
                      >
                        See User
                      </button>
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          marginRight: "10px",
                          width: "90px",
                          height: "30px",
                        }}
                        onClick={() => openRolePanel(user._id)}
                      >
                        Set Role
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginRight: "10px",
                          width: "100px",
                          height: "30px",
                        }}
                        onClick={() => openBanPanel(user._id)}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showRolePanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <label style={{ color: "black" }}>Select Role:</label>
          <select
            style={{ color: "black" }}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" selected="selected" hidden="hidden">
              Choose here
            </option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Staff">Staff</option>
          </select>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={handleRoleChange}
          >
            Save
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeRolePanel}
          >
            Cancel
          </button>
        </div>
      )}

      {showBanPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <label style={{ color: "black", marginRight: "100px" }}>
            Are you sure?
          </label>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={() => handleBan()}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeBanPanel}
          >
            Cancel
          </button>
        </div>
      )}

      {selectedTable === "clubs" && (
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            //onChange={handleSearch}
            style={{
              color: "black",
              width: "500px",
              margin: "0 auto",
              marginBottom: "10px",
              display: "block",
            }}
          />
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "30px",
              backgroundColor: "gray",
              marginBottom: "20px",
            }}
          >
            Clubs
          </h1>
          <div style={{ overflowX: "auto", maxHeight: "600px" }}>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ width: "8%", padding: "8px" }}>ID</th>
                  <th style={{ width: "10%", padding: "8px" }}>Name</th>
                  <th style={{ width: "20%", padding: "8px" }}>Description</th>
                  <th style={{ width: "10%", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club.id}>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {club._id}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {club.name}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {club.description}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {}
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginRight: "10px",
                          width: "130px",
                          height: "30px",
                        }}
                        onClick={() =>
                          (window.location.href =
                            "/clubdetailspage/" + club._id)
                        }
                      >
                        See Club Page
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginRight: "10px",
                          width: "130px",
                          height: "30px",
                        }}
                        onClick={() => openDeleteClubPanel(club.id)}
                      >
                        Delete Club
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                marginTop: "20px",
                marginRight: "10px",
                width: "130px",
                height: "30px",
                margin: "0 auto",
                display: "block",
              }}
              onClick={openAddClubPanel}
            >
              Add Club
            </button>
          </div>
        </div>
      )}
      {showDeleteClubPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <label style={{ color: "black", marginRight: "100px" }}>
            Are you sure to delete club?
          </label>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={() => handleDeleteClub()}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeDeleteClubPanel}
          >
            Cancel
          </button>
        </div>
      )}

      {showAddClubPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "40px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2>Create New Club</h2>
          <label>
            Club Name:
            <input
              style={{ marginLeft: "59px", width: "300px" }}
              type="text"
              placeholder="Enter club name here"
              value={selectedClubName}
              onChange={(e) => setSelectedClubName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Club Description:
            <input
              style={{ marginLeft: "16px", width: "300px" }}
              type="text"
              placeholder="Enter club description here"
              value={selectedClubDescription}
              onChange={(e) => setSelectedClubDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Club Executive ID:
            <input
              style={{ marginLeft: "10px", width: "300px" }}
              type="text"
              placeholder="Enter club executive's id here"
              value={selectedClubExecutiveID}
              onChange={(e) => setSelectedClubExecutiveID(e.target.value)}
            />
          </label>
          <br />
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={() => handleAddClub()}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeAddClubPanel}
          >
            Cancel
          </button>
        </div>
      )}
      {selectedTable === "marketplace" && (
        <div>
          <input
            type="text"
            placeholder="Search by name or description"
            value={searchTerm}
            //onChange={handleSearch}
            style={{
              color: "black",
              width: "500px",
              margin: "0 auto",
              marginBottom: "10px",
              display: "block",
            }}
          />
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "30px",
              backgroundColor: "gray",
              marginBottom: "20px",
            }}
          >
            Marketplace Posts
          </h1>
          <div style={{ overflowX: "auto", maxHeight: "600px" }}>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ width: "20%", padding: "8px" }}>ID</th>
                  <th style={{ width: "30%", padding: "8px" }}>Title</th>
                  <th style={{ width: "50%", padding: "8px" }}>Description</th>
                  <th style={{ width: "30%", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {marketplace.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {item._id}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {item.title}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {item.description}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {}
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginRight: "10px",
                          width: "180px",
                          height: "30px",
                        }}
                        onClick={() =>
                          (window.location.href = "/marketplace/" + item._id)
                        }
                      >
                        See Marketplace Post
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginRight: "10px",
                          width: "130px",
                          height: "30px",
                        }}
                        onClick={() => openDeleteMarketplacePostPanel(item._id)}
                      >
                        Delete Post
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showDeleteMarketplacePostPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <label style={{ color: "black", marginRight: "100px" }}>
            Are you sure to delete marketplace post?
          </label>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={() => handleDeleteMarketplacePost()}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeDeleteMarketplacePostPanel}
          >
            Cancel
          </button>
        </div>
      )}
      {selectedTable === "social" && (
        <div>
          <input
            type="text"
            placeholder="Search by name or content"
            value={searchTerm}
            //onChange={handleSearch}
            style={{
              color: "black",
              width: "500px",
              margin: "0 auto",
              marginBottom: "10px",
              display: "block",
            }}
          />
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "30px",
              backgroundColor: "gray",
              marginBottom: "20px",
            }}
          >
            Social Posts
          </h1>
          <div style={{ overflowX: "auto", maxHeight: "600px" }}>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ width: "20%", padding: "8px" }}>ID</th>
                  <th style={{ width: "20%", padding: "8px" }}>Title</th>
                  <th style={{ width: "60%", padding: "8px" }}>Content</th>
                  <th style={{ width: "30%", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {social.map((post) => (
                  <tr key={post.id}>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {post._id}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {post.title}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {post.content}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {}
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginRight: "10px",
                          width: "180px",
                          height: "30px",
                        }}
                        onClick={() =>
                          (window.location.href = "/feed/" + post._id)
                        }
                      >
                        See Social Post
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginRight: "10px",
                          width: "130px",
                          height: "30px",
                        }}
                        onClick={() => openDeleteSocialPostPanel(post._id)}
                      >
                        Delete Post
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showDeleteSocialPostPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <label style={{ color: "black", marginRight: "100px" }}>
            Are you sure to delete social post?
          </label>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={() => handleDeleteSocialPost()}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
              width: "130px",
              height: "30px",
            }}
            onClick={closeDeleteSocialPostPanel}
          >
            Cancel
          </button>
        </div>
      )}

      {selectedTable === "tickets" && (
        <div>
          <input
            type="text"
            placeholder="Search by owner or message"
            value={searchTerm}
            //onChange={handleSearch}
            style={{
              color: "black",
              width: "500px",
              margin: "0 auto",
              marginBottom: "10px",
              display: "block",
            }}
          />
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "30px",
              backgroundColor: "gray",
              marginBottom: "20px",
            }}
          >
            Tickets
          </h1>
          <div style={{ overflowX: "auto", maxHeight: "600px" }}>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ width: "20%", padding: "8px" }}>Sender ID</th>
                  <th style={{ width: "20%", padding: "8px" }}>Sender Name</th>
                  <th style={{ width: "60%", padding: "8px" }}>Message</th>
                  <th style={{ width: "10%", padding: "8px" }}>Handled</th>
                  <th style={{ width: "20%", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {ticket.senderId}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {ticket.senderName}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {ticket.message}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {ticket.isResponded ? "Yes" : "No"}
                    </td>
                    <td
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid gray",
                        padding: "8px",
                      }}
                    >
                      {}
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginRight: "10px",
                          width: "200px",
                          height: "30px",
                        }}
                        onClick={() => handleTicket(ticket._id)}
                      >
                        {ticket.isResponded
                          ? "Flag as Unhandled"
                          : "Flag as Handled"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
