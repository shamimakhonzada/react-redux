import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen pt-4">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="user-form" element={<UserForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
