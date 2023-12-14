"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AcademicPostCard = ({
  writer,
  courseCode,
  initialSection,
  requestedSection,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;

  const handleContact = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/createDialog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemId: courseCode,
            sellerId: writer,
          }),
        }
      );

      if (response.ok) {
        console.log("Created!");
        router.push("/message"); // Redirect to /message upon successful response
      } else {
        console.error("Failed to create dialog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{courseCode} Section Swap</h5>
        <i className="card-text">{writer}</i>
        <p className="card-text">CourseCode: {courseCode}</p>
        <p className="card-text">Initial section: {initialSection}</p>
        <p className="card-text">Requested section: {requestedSection}</p>
        <button
          className="btn btn-primary"
          onClick={() => handleContact()}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default AcademicPostCard;
