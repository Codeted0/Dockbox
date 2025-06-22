import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MainApp from "./MainApp";
import PrivateRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";

function App() {
  return (
    <>
      {/* ✅ Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* ✅ Route Config */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
