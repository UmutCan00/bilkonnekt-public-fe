"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";

// Mock user data
const mockUsers = [
{ id: 1, username: 'john_doe', email: 'john.doe@example.com', role: 'Student', isBanned: false },
{ id: 2, username: 'jane_smith', email: 'jane.smith@example.com', role: 'Instructor', isBanned: true },
{ id: 3, username: 'alex_jackson', email: 'alex.jackson@example.com', role: 'Staff', isBanned: false },
{ id: 4, username: 'emily_williams', email: 'emily.williams@example.com', role: 'Club Executive', isBanned: true },
{ id: 5, username: 'david_miller', email: 'david.miller@example.com', role: 'Admin', isBanned: false },
{ id: 6, username: 'serhan_turan', email: 'serhan.turan@example.com', role: 'Student', isBanned: false },
{ id: 7, username: 'umut_can_bolat', email: 'jane.smith@example.com', role: 'Instructor', isBanned: true },
{ id: 8, username: 'alex_jackson', email: 'alex.jackson@example.com', role: 'Staff', isBanned: false },
{ id: 9, username: 'emily_williams', email: 'emily.williams@example.com', role: 'Club Executive', isBanned: true },
{ id: 10, username: 'david_miller', email: 'david.miller@example.com', role: 'Admin', isBanned: false },
{ id: 11, username: 'lightning_mcqueen', email: 'lightning.mcqueen@example.com', role: 'Admin', isBanned: false },
];

// Mock marketplace posts
const mockMarketplacePosts = [
{ id: 1, name: 'Basys 3', description: '200 TL' },
{ id: 2, name: 'CS 223 book', description: 'n11den aldim' },
{ id: 3, name: 'Macbook air', description: 'Orijinal apple' },
{ id: 10, name: 'Post 1', description: 'Description for Post 1' },
{ id: 2, name: 'Post 2', description: 'Description for Post 2' },
{ id: 3, name: 'Post 3', description: 'Description for Post 3' },
{ id: 1, name: 'Post 1', description: 'Description for Post 1' },
{ id: 2, name: 'Post 2', description: 'Description for Post 2' },
{ id: 3, name: 'Post 3', description: 'Description for Post 3' },
{ id: 1, name: 'Post 1', description: 'Description for Post 1' },
{ id: 2, name: 'Post 2', description: 'Description for Post 2' },
{ id: 3, name: 'Post 3', description: 'Description for Post 3' },
{ id: 1, name: 'Post 1', description: 'Description for Post 1' },
{ id: 2, name: 'Post 2', description: 'Description for Post 2' },
{ id: 3, name: 'Post 3', description: 'Description for Post 3' },
];

const RoleDropdown = ({ onSelect, initialValue }) => {
const roles = ['Student', 'Instructor', 'Staff', 'Club Executive', 'Admin'];

return (
    <select value={initialValue} onChange={(e) => onSelect(e.target.value)}>
    {roles.map((role) => (
        <option key={role} value={role}>
        {role}
        </option>
    ))}
    </select>
);
};

const Admin = () => {
const [users, setUsers] = useState(mockUsers);
const [selectedUserId, setSelectedUserId] = useState(null);
const [showBanConfirmation, setShowBanConfirmation] = useState(false);
const [selectedRole, setSelectedRole] = useState('Student');
const [searchTerm, setSearchTerm] = useState('');
const [marketplaceSearchTerm, setMarketplaceSearchTerm] = useState('');

const openRoleSelection = (userId) => {
    setSelectedUserId(userId);
};

const closeRoleSelection = () => {
    setSelectedUserId(null);
};

const handleRoleChange = () => {
    if (selectedUserId && selectedRole) {
    setUsers((prevUsers) =>
        prevUsers.map((user) =>
        user.id === selectedUserId ? { ...user, role: selectedRole } : user
        )
    );
    closeRoleSelection();
    }
};

const handleBanToggle = (userId) => {
    setUsers((prevUsers) =>
    prevUsers.map((user) =>
        user.id === userId ? { ...user, isBanned: !user.isBanned } : user
    )
    );
};

const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
    // If the search term is empty, reset to the original user list
    setUsers(mockUsers);
    return;
    }

    // Filter users based on name or email containing the search term
    const filteredUsers = mockUsers.filter(
    (user) =>
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );

    setUsers(filteredUsers);
};

const handleMarketplaceSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setMarketplaceSearchTerm(term);

    if (!term) {
    // If the search term is empty, reset to the original marketplace post list
    return;
    }

    // Filter marketplace posts based on name or description containing the search term
    const filteredMarketplacePosts = mockMarketplacePosts.filter(
    (post) =>
        post.name.toLowerCase().includes(term) ||
        post.description.toLowerCase().includes(term)
    );

    // Update the marketplace post list with the filtered results
    setMarketplacePosts(filteredMarketplacePosts);
};

const handleDeletePost = (postId) => {
    // Remove the post with the specified ID from the marketplace post list
    setMarketplacePosts((prevPosts) =>
    prevPosts.filter((post) => post.id !== postId)
    );
};

return (
    <div>
    <Navbar />

    <h1>User Management</h1>
    <div className="search-bar" style={{ color: 'black' }}>
        <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
        />
    </div>
    <div className="table-container">
        <table>
        <thead style={{ background: 'black', color: 'white' }}>
            <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
            <tr key={user.id} style={{ background: 'white', color: 'black' }}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isBanned ? 'Yes' : 'No'}</td>
                <td>
                <button
                    className="set-role-btn"
                    onClick={() => openRoleSelection(user.id)}
                >
                    Set Role
                </button>
                <button
                    className="ban-user-btn"
                    onClick={() => handleBanToggle(user.id)}
                >
                    {user.isBanned ? 'Unban' : 'Ban'}
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

    {selectedUserId && (
        <div className="role-selection-panel">
        <h2>Select Role</h2>
        <RoleDropdown
            initialValue={selectedRole}
            onSelect={(role) => setSelectedRole(role)}
        />
        <button className="green-btn" onClick={handleRoleChange}>
            Save
        </button>
        <button className="red-btn" onClick={closeRoleSelection}>
            Cancel
        </button>
        </div>
    )}

    <h1>Marketplace Posts</h1>
    <div className="search-bar" style={{ color: 'black' }}>
        <input
        type="text"
        placeholder="Search by name or description"
        value={marketplaceSearchTerm}
        onChange={handleMarketplaceSearch}
        />
    </div>
    <div className="table-container">
        <table>
        <thead style={{ background: 'blue', color: 'white' }}>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {mockMarketplacePosts.map((post) => (
            <tr key={post.id} style={{ background: 'white', color: 'black' }}>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.description}</td>
                <td>
                <button
                    className="see-post-btn"
                    onClick={() => window.location.href = '/marketplace/id'}
                >
                    See Post
                </button>
                <button
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(post.id)}
                >
                    Delete Post
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

    <style jsx>{`
        .search-bar {
        margin-bottom: 20px;
        }

        input {
        padding: 8px;
        width: 300px;
        }

        .table-container {
        max-height: 400px;
        overflow-y: auto;
        }

        table {
        border-collapse: collapse;
        width: 100%;
        }

        th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }

        th {
        background-color: black;
        color: white;
        }

        .role-selection-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid #ccc;
        color: black;
        }

        .set-role-btn {
        background-color: green;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        margin-right: 5px;
        }

        .delete-post-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 5px;
        }

        .ban-user-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 5px;
        }

        .green-btn {
        background-color: green;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        margin-right: 5px;
        }

        .red-btn {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        }

        .marketplace-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        }

        .marketplace-post {
        border: 1px solid #ddd;
        padding: 10px;
        width: 300px;
        }

        .marketplace-post button {
        background-color: blue;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 10px;
        }

        .see-post-btn {
        background-color: blue;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        }
    `}</style>
    </div>
);
};

export default Admin;