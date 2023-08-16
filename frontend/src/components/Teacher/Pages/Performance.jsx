import React, { useState, useEffect } from "react";
import { Select, Row, Col, Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./Performance.css";
import { fetchSubjects } from "../../Administrator/CRUD/subjects/FetchSubjects";
import axios from "axios";
import LoadingSpinner from "../../Loading/Loading";
const { Option } = Select;

const Performance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const filterScoresByRange = (scores, range) => {
    const [min, max] = range.split("-").map(Number);
    return scores.filter((score) => {
      const numericScore = score === "AB" ? 0 : Number(score);
      return numericScore >= min && numericScore <= max;
    });
  };

  useEffect(() => {
    if (selectedYear && selectedGrade && selectedSubject) {
      setLoading(true);

      const fetchChartData = async (year, grade, subject) => {
        try {
          const response = await axios.get(
            `/api/marks/terms/${year}/${grade}/${subject}`
          );
          return response.data;
        } catch (error) {
          throw new Error("Error fetching chart data");
        }
      };

      fetchChartData(selectedYear, selectedGrade, selectedSubject)
        .then((data) => {
          const term1Data = data.find((term) => term.term === 1);
          const term2Data = data.find((term) => term.term === 2);
          const term3Data = data.find((term) => term.term === 3);

          if (term1Data || term2Data || term3Data) {
            const scoreRanges = ["0-34", "35-49", "50-64", "65-74", "75-100"];
            const processedData = scoreRanges.map((range) => {
              const term1Scores = term1Data ? term1Data.scores : [];
              const term2Scores = term2Data ? term2Data.scores : [];
              const term3Scores = term3Data ? term3Data.scores : [];

              const term1Count = filterScoresByRange(term1Scores, range).length;
              const term2Count = filterScoresByRange(term2Scores, range).length;
              const term3Count = filterScoresByRange(term3Scores, range).length;

              return {
                range,
                term1: term1Count,
                term2: term2Count,
                term3: term3Count,
              };
            });
            setChartData(processedData);
          } else {
            setChartData([]);
          }
        })
        .catch((error) => {
          setChartData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Error: Please select year, grade, and subject.");
    }
  }, [selectedYear, selectedGrade, selectedSubject]);

  const grades = [];
  for (let i = 1; i <= 11; i++) {
    grades.push(
      <Option key={i} value={i}>
        Grade {i}
      </Option>
    );
  }

  return (
    <div>
      <h1>Student Performance</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <h3>Select Year</h3>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => setSelectedYear(value)}
            >
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <h3>Select Grade</h3>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => setSelectedGrade(value)}
            >
              {grades}
            </Select>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <h3>Select Subject</h3>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => setSelectedSubject(value)}
            >
              {subjects.map((subject) => (
                <Option key={subject.subject_id} value={subject.subject_name}>
                  {subject.subject_name}
                </Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24}>
          <Card className="chart">
            <h3 className="chart-heading-h1">
              Student Performance for {selectedYear} - Grade {selectedGrade} -{" "}
              {selectedSubject}
            </h3>
            {loading ? (
              <LoadingSpinner />
            ) : chartData.length > 0 ? (
              <BarChart width={800} height={400} data={chartData}>
                <XAxis
                  dataKey="range"
                  label={{
                    value: "Marks Range",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Number of Students",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                  }}
                />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  align="right"
                />{" "}
                <Bar dataKey="term1" fill="#0088FE" name="Term 1" />
                <Bar dataKey="term2" fill="#00C49F" name="Term 2" />
                <Bar dataKey="term3" fill="#FFBB28" name="Term 3" />
              </BarChart>
            ) : (
              <div>No Data Available</div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Performance;
