import React from "react";

const SingleStudent = ({ data: student }) => {

    return(
        <div>
            <h2>{student.firstName} {student.lastName}</h2>
            <img src={student.imageUrl} />
            <p>Contact: {student.email}</p>
            <p>Current GPA: {student.gpa}</p>
        </div>
    )
}

export default SingleStudent;
