import React from "react";
import { useSelector } from "react-redux";
import SingleStudent from "./SingleStudentListed";

const AllStudents = () => {
    const students = useSelector(state => state.students);

    return(
        <div>
            {students.map(student => 
                <SingleStudent key={student.id} data={student}/>
            )}
        </div>
    )
}

export default AllStudents;
