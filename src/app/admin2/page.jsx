"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Admin = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = (tableName) => {
    setSelectedTable(tableName);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterUserData = () => {
    return mockData.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const mockData = {
    users: [
      { id: 1, name: 'Serhan Turan', email: 'serhan.turan@ug.bilkent.edu.tr', role: 'Admin', banned: false },
      { id: 2, name: 'Umut Can Bolat', email: 'umut.cbolat@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 3, name: 'Ece Beyhan', email: 'ece.beyhan@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 4, name: 'Cenker Akan', email: 'cenker.akan@bilkent.edu.tr', role: 'Instructor', banned: false },
      { id: 5, name: 'Merter', email: 'merter.ter@ug.bilkent.edu.tr', role: 'Club Executive', banned: false },
      { id: 6, name: 'Ege', email: 'ege.şire@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 7, name: 'Kachow', email: 'rust.eze@bilkent.edu.tr', role: 'Staff', banned: false },
      { id: 8, name: 'Merter', email: 'mert.er@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 1, name: 'Serhan Turan', email: 'serhan.turan@ug.bilkent.edu.tr', role: 'Admin', banned: false },
      { id: 2, name: 'Umut Can Bolat', email: 'umut.cbolat@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 3, name: 'Ece Beyhan', email: 'ece.beyhan@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 4, name: 'Cenker Akan', email: 'cenker.akan@bilkent.edu.tr', role: 'Instructor', banned: false },
      { id: 5, name: 'Merter', email: 'merter.ter@ug.bilkent.edu.tr', role: 'Club Executive', banned: false },
      { id: 6, name: 'Ege', email: 'ege.şire@ug.bilkent.edu.tr', role: 'Student', banned: false },
      { id: 7, name: 'Kachow', email: 'rust.eze@bilkent.edu.tr', role: 'Staff', banned: false },
      { id: 8, name: 'Merter', email: 'mert.er@ug.bilkent.edu.tr', role: 'Student', banned: false },
    ],
    clubs: [
      { id: 1, name: 'Bilkent YES' },
      { id: 2, name: 'Wizards' },
    ],
    marketplace: [
      { id: 1, name: 'Basys 3', description: 'EA 201deyim' },
      { id: 2, name: 'CS 223 Kitabi', description: '1200TL' },
    ],
    social: [
      { id: 1, name: 'Arabam!', content: 'Mescit otoparkta arabami çizmişler.' },
      { id: 2, name: 'Yemekhanedeki çocuk', content: 'Tanişmak isterim saat 10da gördüm.' },
    ],
    tickets: [
      { id: 1, owner: 'Serhan Turan', message: 'İletişim butonu çalişmiyor' },
      { id: 2, owner: 'Kachow', message: 'Şifremi unuttum' },
    ],
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
  <button
    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '50px'}}
    onClick={() => handleButtonClick('users')}
  >
    See User List
  </button>
  <button
    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '50px'}}
    onClick={() => handleButtonClick('clubs')}
  >
    See Club Page List
  </button>
  <button
    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '50px'}}
    onClick={() => handleButtonClick('marketplace')}
  >
    See Marketplace Posts
  </button>
  <button
    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '50px'}}
    onClick={() => handleButtonClick('social')}
  >
    See Social Posts
  </button>
  <button
    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '50px'}}
    onClick={() => handleButtonClick('tickets')}
  >
    See Tickets
  </button>
</div>
      {selectedTable === 'users' && (
        <div>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black', width: '500px', margin: '0 auto', marginBottom: '10px', display: 'block'}}
          />
          <div style={{ overflowX: 'auto', maxHeight: '600px' }}>
            <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ width: '10%', padding: '8px' }}>ID</th>
                  <th style={{ width: '20%', padding: '8px' }}>Name</th>
                  <th style={{ width: '30%', padding: '8px' }}>Email</th>
                  <th style={{ width: '20%', padding: '8px' }}>Role</th>
                  <th style={{ width: '10%', padding: '8px' }}>Banned</th>
                  <th style={{ width: '30%', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterUserData().map((user) => (
                  <tr key={user.id}>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{user.id}</td>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{user.name}</td>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{user.email}</td>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{user.role}</td>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{user.banned ? 'Yes' : 'No'}</td>
                    <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>
                      {}
                      <button 
                      style={{backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '90px', height: '30px'}}
                      onClick={() => window.location.href = "/profilePage/" + user.id}>See User</button>
                      <button 
                      style={{backgroundColor: 'green', color: 'white', marginRight: '10px' , width: '90px', height: '30px'}}>Set Role</button>
                      <button 
                      style={{backgroundColor: 'red', color: 'white', marginRight: '10px' , width: '130px', height: '30px'}}>Ban Operations</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{selectedTable === 'clubs' && (
      <div>
        <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black', width: '500px', margin: '0 auto', marginBottom: '10px', display: 'block'}}
          />
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ width: '10%', padding: '8px' }}>ID</th>
                <th style={{ width: '10%', padding: '8px' }}>Name</th>
                <th style={{ width: '10%', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.clubs.map(club => (
                <tr key={club.id}>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{club.id}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{club.name}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>
                    {}
                    <button 
                      style={{backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '130px', height: '30px'}}>See Club Page</button>
                    <button 
                      style={{backgroundColor: 'red', color: 'white', marginRight: '10px' , width: '100px', height: '30px'}}>Delete Club</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {selectedTable === 'marketplace' && (
        <div>
        <input
            type="text"
            placeholder="Search by name or description"
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black', width: '500px', margin: '0 auto', marginBottom: '10px', display: 'block'}}
          />
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ width: '10%', padding: '8px' }}>ID</th>
                <th style={{ width: '30%', padding: '8px' }}>Name</th>
                <th style={{ width: '50%', padding: '8px' }}>Description</th>
                <th style={{ width: '30%', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.marketplace.map(item => (
                <tr key={item.id}>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{item.id}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{item.name}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{item.description}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>
                    {}
                    <button 
                      style={{backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '30px'}}
                      onClick={() => window.location.href = "/marketplace/" + item.id}>See Marketplace Post
                      </button>
                    <button 
                      style={{backgroundColor: 'red', color: 'white', marginRight: '10px' , width: '130px', height: '30px'}}>Delete Post</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {selectedTable === 'social' && (
        <div>
        <input
            type="text"
            placeholder="Search by name or content"
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black', width: '500px', margin: '0 auto', marginBottom: '10px', display: 'block'}}
          />
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ width: '10%', padding: '8px' }}>ID</th>
                <th style={{ width: '30%', padding: '8px' }}>Name</th>
                <th style={{ width: '60%', padding: '8px' }}>Content</th>
                <th style={{ width: '30%', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.social.map(post => (
                <tr key={post.id}>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{post.id}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{post.name}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{post.content}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>
                    {}
                    <button 
                      style={{backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '30px'}}
                      onClick={() => window.location.href = "/social/" + post.id}>See Social Post</button>
                    <button 
                      style={{backgroundColor: 'red', color: 'white', marginRight: '10px' , width: '130px', height: '30px'}}>Delete Post</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {selectedTable === 'tickets' && (
        <div>
        <input
            type="text"
            placeholder="Search by owner or message"
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black', width: '500px', margin: '0 auto', marginBottom: '10px', display: 'block'}}
          />
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ width: '10%', padding: '8px' }}>ID</th>
                <th style={{ width: '30%', padding: '8px' }}>Owner</th>
                <th style={{ width: '60%', padding: '8px' }}>Message</th>
                <th style={{ width: '40%', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{ticket.id}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{ticket.owner}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>{ticket.message}</td>
                  <td style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray', padding: '8px' }}>
                    {}
                    <button 
                      style={{backgroundColor: 'blue', color: 'white', marginRight: '10px' , width: '180px', height: '30px'}}>Flag as Read</button>
                    <button 
                      style={{backgroundColor: 'red', color: 'white', marginRight: '10px' , width: '180px', height: '30px'}}>Flag as Completed</button>
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