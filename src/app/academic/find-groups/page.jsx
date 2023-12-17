"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";

const GroupCard = ({
  id, groupName, courseCode, handleGroupClick,
}) => {

  return (
    <>
      <style jsx global>{`
        /* Global styles to remove underlines from links */
        a {
          text-decoration: none;
        }
      `}</style>

      <div className="card mb-3 position-relative">
        <div className="card-body">
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h5
              className="card-title"
              style={{ marginTop: "8px", marginLeft: "-10px" }}
            >
              {courseCode}
            </h5>

          </div>
          <p className="card-text text-left">GroupName: {groupName}</p>

          <div className="card-body" style={{ paddingBottom: "0px" }}>
            <div className="row" style={{ marginTop: "-5px" }}>
              <div className="col">
                  <Button
                    className="btn btn-primary  "
                    variant="info"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => handleGroupClick(id)}
                  > Join Group
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );






}

const GroupPage = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentGroups, setCurrentGroups] = useState([]);
  const [applicationDescription, setApplicationDescription] = useState("");

  const currentDate = new Date();
  

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const currentuserid = session?.user?._id;

  const handleGroupClick = (groupId) => {
    const selectedGroup = currentGroups.find((group) => group._id === groupId);
    setCurrentGroup(selectedGroup);
    console.log("click", groupId);
  };
  const handleBackButtonClick = () => {
    setCurrentGroup(null);
  };
  const joinGroup = async (groupId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/applyToStudyGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: groupId,
            description: applicationDescription,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleJoinButtonClick = (id) => {
    console.log("join", id);
    joinGroup(id);
    window.location.reload();
  };

  const fetchUserGroupData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/getAllGroups",
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
        setCurrentGroups(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserGroupData();
  }, [token]);

  if (currentGroup) {
    return (
      <div>
        <Navbar />
        <div className="col-md-9" style={{ marginLeft: "170px" }}>
            <header className=" card text-center mx-auto titleColor m-2 text-white bg-custom1" style={{ maxWidth:"500px" }}>
              <h1>Join Group </h1>
            </header>
          <Button
            className="btn btn-primary  "
            variant="info"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleBackButtonClick}
          > Back
          </Button>
          <div className="card mb-3 position-relative bg-custom1">
            <div className="card-body">
             
                <h5
                  className="card-title text-white text-center"
                  style={{color: "white" }}
                >
                  {currentGroup.groupName}
                </h5>
              
              <p className="card-text text-center text-white">Group Description: {currentGroup.description}</p>

              <div className="card-body" style={{ paddingBottom: "0px" }}>
                
                {currentGroup?.members?.map((member, index) => (
                  <div key={index}>
                    <div>
                      <p>{member}</p>
                    </div>
                  </div>
                ))}
                <textarea
                  placeholder="Enter description"
                  value={applicationDescription}
                  onChange={(e) => setApplicationDescription(e.target.value)}
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    fontSize: "16px",
                    minHeight: "100px",
                  }}
                />
              
                <div className="row" style={{ marginTop: "-5px" }}>
                  <div className="col">
                    <Button className="btn btn-primary" onClick={() => handleJoinButtonClick(currentGroup._id)}>
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
        <style jsx>{`

      .social-post-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .socialpost-card {
        width: 100%;
        max-width: 600px;
        margin-left: 30px;
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
        
        .bg-custom1 {
          background-color: #0B1356;
          
        }

        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 200px;
          height: 300px;
          margin-top: 160px;
        }

        .sidebar h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          margin-bottom: 5px;
        }

        .sidebar button {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-size: 14px;
        }

        .sidebar button:hover {
          text-decoration: underline;
        }

        .search-bar {
          text-align: center;
          margin-top: 20px;
        }

      `}</style>
      </div>
    );
  }

  const numColumns = 4;
  const itemsPerColumn = Math.ceil(currentGroups.length / numColumns);

  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      currentGroups.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }

  return (
    <div>
      <Navbar />
      <div className="col-md-9" style={{ marginLeft: "170px" }}>
        <header className=" card text-center mx-auto titleColor m-2 text-white bg-custom1" style={{ maxWidth:"500px" }}>
          <h1>Groups with Missing Members </h1>
        </header>
        <main style={{ marginTop: "20px" }}>
          <div className="social-post-container card bg-custom1">
          <div className="list " style={{ marginTop:"10px",display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="column">
                {column.map((group, index) => (
                  <div key={index}>
                    {" "}
                    {/* Add the key prop here */}
                    <div className="socialpost-card">
                      <GroupCard
                        id={group._id}
                        groupName={group.groupName}
                        courseCode={group.courseCode}
                        handleGroupClick={handleGroupClick}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            </div>
          </div>
          
        </main>
          <footer className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Bilkonnekt Marketplace</p>
          </footer>
      </div>
      <style jsx>{`

      .social-post-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .socialpost-card {
        width: 100%;
        max-width: 600px;
        margin-left: 30px;
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
        
        .bg-custom1 {
          background-color: #0B1356;
          
        }

        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 200px;
          height: 300px;
          margin-top: 160px;
        }

        .sidebar h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          margin-bottom: 5px;
        }

        .sidebar button {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-size: 14px;
        }

        .sidebar button:hover {
          text-decoration: underline;
        }

        .search-bar {
          text-align: center;
          margin-top: 20px;
        }

      `}</style>
    </div>
    
  );
};

export default GroupPage;
