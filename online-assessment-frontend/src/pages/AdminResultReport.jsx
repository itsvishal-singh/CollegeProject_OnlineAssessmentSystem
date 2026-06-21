import { useEffect, useState } from "react";
import api from "../api/axios";
// import api from "../axios";

export default function AdminResultReport() {
  const [exams, setExams] = useState([]);

  const [selectedExam, setSelectedExam] = useState("");

  const [report, setReport] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await api.get("/admin/exams");

      setExams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadReport = async (examId) => {
    try {
      const analytics = await api.get(`/admin/reports/exam/${examId}`);

      const studentResults = await api.get(
        `/admin/reports/exam/${examId}/students`,
      );

      setReport(analytics.data);

      setStudents(studentResults.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Result Reports</h1>

      {/* Select Exam */}

      <div className="mb-8">
        <select
          value={selectedExam}
          onChange={(e) => {
            const examId = e.target.value;

            setSelectedExam(examId);

            if (examId) {
              loadReport(examId);
            }
          }}
          className="border rounded-lg p-3 w-80"
        >
          <option value="">Select Exam</option>

          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      {report && (
        <>
          {/* Cards */}

          <div className="grid grid-cols-4 gap-5 mb-8">
            <div className="border rounded-lg p-5">
              <h3>Total Attempts</h3>

              <p className="text-3xl font-bold">{report.totalAttempts}</p>
            </div>

            <div className="border rounded-lg p-5">
              <h3>Passed</h3>

              <p className="text-3xl font-bold">{report.passed}</p>
            </div>

            <div className="border rounded-lg p-5">
              <h3>Average Score</h3>

              <p className="text-3xl font-bold">{report.averageScore}</p>
            </div>

            <div className="border rounded-lg p-5">
              <h3>Highest Score</h3>

              <p className="text-3xl font-bold">{report.highestScore}</p>
            </div>
          </div>

          {/* Student Table */}

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="border">
                  <th className="p-3">Student</th>

                  <th>Email</th>

                  <th>Score</th>

                  <th>Questions</th>

                  <th>%</th>

                  <th>Status</th>

                  <th>Submitted</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border text-center">
                    <td className="p-3">{student.studentName}</td>

                    <td>{student.studentEmail}</td>

                    <td>{student.score}</td>

                    <td>{student.totalQuestions}</td>

                    <td>{student.percentage}%</td>

                    <td>{student.status}</td>

                    <td>{student.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
