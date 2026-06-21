import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentExams from "./pages/StudentExams";
import ExamPage from "./pages/ExamPage";
import ManageExams from "./pages/ManageExams";
import ManageQuestions from "./pages/ManageQuestions";
import ManageStudents from "./pages/ManageUsers";
import ResultPage from "./pages/ResultPage";
import ProfilePage from "./pages/ProfilePage";
import ResultsListPage from "./pages/ResultsListPage";
import AttemptedPage from "./pages/AttemptedPage";
import AdminResultReport from "./pages/AdminResultReport";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        limit={2}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <StudentExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams/:examId"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <ManageExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <ManageQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results/:attemptId"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <ResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <ResultsListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attempts"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <AttemptedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminResultReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
