import React, { useEffect, useState } from "react";
import { fetchMarksData } from "../../Count/Data";

function Marks() {

  const [marksData, setMarksData] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.id;

  useEffect(() => {
    const fetchMarksDetails = async () => {
      try {
        const data = await fetchMarksData(studentId);
        setMarksData(data);
        console.log(data);
      } catch (error) {
        alert("Error fetching student details:", error);
      }
    };

    fetchMarksDetails();
  }, [studentId]);

  if (!marksData) {
    return <div>Loading...</div>;
  }

  const { year, term, subject, score } = marksData;
  console.log(studentId);
  console.log(score)
  console.log(year)

  return (
    <div>
      <p>Year</p>
      <p>{score}</p>

    </div>
  );
}

export default Marks;
