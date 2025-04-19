import "./App.css";

// routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// hooks
import { useAuth } from "./Hooks/useAuth";
import { useSelector } from "react-redux";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Projects from "./pages/Projects/Projects";
import PostProjects from "./pages/PostProjects/PostProjects";
import Photo from "./pages/Photo/Photo";
import UserProject from "./pages/UserProject/UserProject";
import UpdateProjects from "./pages/UpdateProjects/UpdateProjects";
import Search from "./pages/Search/Search";

function App() {
  const { auth, loading } = useAuth();

  const { user } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/about"
              element={auth ? <About /> : <Navigate to="/login" />}
            />
            <Route
              path="/contact"
              element={auth ? <Contact /> : <Navigate to="/login" />}
            />
            <Route
              path="/updateProfile"
              element={auth ? <UpdateProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/projects"
              element={auth ? <Projects /> : <Navigate to="/login" />}
            />
            <Route
              path="/post"
              element={auth ? <PostProjects /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <UserProject /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/update/:id"
              element={auth ? <UpdateProjects /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
