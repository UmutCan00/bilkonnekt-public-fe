"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AcademicPostCard = ({
  writer,
  courseCode,
  initialSection,
  requestedSection,
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{courseCode} Section Swap</h5>
        <i className="card-text">{writer}</i>
        <p className="card-text">CourseCode: {courseCode}</p>
        <p className="card-text">Initial section: {initialSection}</p>
        <p className="card-text">Requested section: {requestedSection}</p>
        <button className="btn btn-primary">Contact</button>
      </div>
    </div>
  );
};

export default AcademicPostCard;
