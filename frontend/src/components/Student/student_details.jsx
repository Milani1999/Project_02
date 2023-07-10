import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentDetails() {

    const[students,setStudents]=useState([]);


    const fetch_S_Details = async () => {
        const { data } = await axios.get('/api/students');
        setStudents(data);
    }

console.log(students);

    useEffect(() => {
        fetch_S_Details();
    }, [])

    return (
        <div>
            StudentDetails
        </div>
    )
}

export default StudentDetails;