import React from "react";
import { useSelector } from "react-redux";
import { SingleStudentListed } from "../";

const AllStudents = () => {
    const students = useSelector(state => state.students);

    return(
        <div>
            {students.map(student => 
                <SingleStudentListed key={student.id} data={student}/>
            )}
        </div>
    )
}

export default AllStudents;
