import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ProtectedRoute from './components/ProtectedRoute';
import HeroSection from './components/HeroSection';
import InitiativesSection from './components/InitiativesSection';
import UserProfile from './pages/Profile/UserProfile'
import ResourcesPage from './pages/Resources/ResourcesPage'
import ForumPage from './pages/Forum/ForumPage'
import TopicForm from './pages/Forum/TopicForm'
import TopicPage from './pages/Forum/TopicPage'
import CoursesPage from './pages/Courses/CoursesPage'
import CourseContent from './pages/Courses/CourseContent'
import Certificate from './pages/Courses/Certificate'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={
            <div className="space-y-12">
              <HeroSection />
              <InitiativesSection />
            </div>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/new"
            element={
              <ProtectedRoute>
                <TopicForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/topic/:id"
            element={
              <ProtectedRoute>
                <TopicPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id/certificate"
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                {/* Admin component will be added later */}
                <div>Admin Panel Coming Soon</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

