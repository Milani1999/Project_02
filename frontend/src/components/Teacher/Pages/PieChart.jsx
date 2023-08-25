import React, { useState, useEffect } from "react";
import { Select, Row, Col, Card } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import "./Performance.css";
import { fetchSubjects } from "../../subjects/FetchSubjects";
import axios from "axios";
import LoadingSpinner from "../../Loading/Loading";

const { Option } = Select;

const COLORS = ["#990000", "#1E5E03"];

const PieChartTable = ({ selectedYear, selectedGrade, selectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [chartDataTerm1, setChartDataTerm1] = useState([]);
  const [chartDataTerm2, setChartDataTerm2] = useState([]);
  const [chartDataTerm3, setChartDataTerm3] = useState([]);
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

          if (term1Data) {
            const term1ProcessedData = processChartData(term1Data);
            setChartDataTerm1(term1ProcessedData);
          } else {
            setChartDataTerm1([]);
          }

          if (term2Data) {
            const term2ProcessedData = processChartData(term2Data);
            setChartDataTerm2(term2ProcessedData);
          } else {
            setChartDataTerm2([]);
          }

          if (term3Data) {
            const term3ProcessedData = processChartData(term3Data);
            setChartDataTerm3(term3ProcessedData);
          } else {
            setChartDataTerm3([]);
          }
        })
        .catch((error) => {
          setChartDataTerm1([]);
          setChartDataTerm2([]);
          setChartDataTerm3([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedYear, selectedGrade, selectedSubject]);

  const processChartData = (termData) => {
    const scoreRanges = ["0-34", "35-100"];
    return scoreRanges.map((range) => {
      const termScores = termData.scores || [];
      const termCount = filterScoresByRange(termScores, range).length;

      return {
        range,
        count: termCount,
      };
    });
  };

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
      <h1 className="h1-marks-stats">
        Pass/Fail marks analysis for {selectedYear} - Grade {selectedGrade} -{" "}
        {selectedSubject}
      </h1>
      <Row>
        <Col xs={24} md={8}>
          <Card className="chart-bar-marks">
            <h3 className="chart-heading-h1">Term 1</h3>
            {loading ? (
              <LoadingSpinner />
            ) : chartDataTerm1.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartDataTerm1}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartDataTerm1.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" align="center" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No Data Available</div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="chart-bar-marks">
            <h3 className="chart-heading-h1">Term 2</h3>
            {loading ? (
              <LoadingSpinner />
            ) : chartDataTerm2.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartDataTerm2}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartDataTerm2.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" align="center" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No Data Available</div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="chart-bar-marks">
            <h3 className="chart-heading-h1">Term 3</h3>
            {loading ? (
              <LoadingSpinner />
            ) : chartDataTerm3.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartDataTerm3}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartDataTerm3.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" align="center" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No Data Available</div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { PieChartTable };
