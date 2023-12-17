"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;

  const postGroup = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/group/createStudyGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupName: groupName,
            description: groupDescription,
            courseCode: selectedLesson,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log(groupName);
    console.log(groupDescription);
    console.log(selectedLesson);
    postGroup();
    router.push("/academic/group-hub");
  };
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="card titleColor text-center text-white mx-auto" style={{maxWidth:"500px"}}>Create a Group</h1>
        <div className="card titleColor text-white mx-auto " style={{maxWidth:"750px"}}>
        <form onSubmit={handleCreateGroup}>
          <div>
            <label className="m-2">
              Group Name:   
              <input className="text-black"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{marginLeft:"10px",width:"540px"}}
              />
            </label>
          </div>
          <label></label>
          <div>
            <label className="m-2">
              Group Description:
              <textarea className="text-black"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                style={{ resize: "none", height: "2rem", overflowY: "scroll",marginLeft:"10px",width:"500px" }}
              />
            </label>
          </div>
          <label></label>
          <div>
            <label className="m-2">
              Choose a Lesson:   
              <input className="text-black"
                type="text"
                value={selectedLesson}
                onChange={(e) => {
                  const capitalizedText = e.target.value.toUpperCase(); // Capitalize input
                  setSelectedLesson(capitalizedText);
                  
                }}
                
                style={{marginLeft:"10px",width:"510px"}}
              />
            </label>
          </div>

          <div className="text-center m-2" style={{ paddingTop: "10px" }}>
            <button 
              type="submit"
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Group
            </button>
          </div>
        </form>
        </div>
      </div>
      <style>{`
          
          .titleColor{
            background-color: #0B1356;
          }
        `}</style>
    </div>
  );
};

export default CreateGroupPage;
