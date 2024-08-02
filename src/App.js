import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  //https://api.spoonacular.com/recipes/complexSearch
  return (
    <AuthContextProvider>
      <div>
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
