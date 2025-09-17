import { BrowserRouter as Router } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataProvider"; // ✅
import PublicRoute from "./routes/PublicRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <PublicRoute />
      </Router>
    </UserDataProvider>
  );
}

export default App;
