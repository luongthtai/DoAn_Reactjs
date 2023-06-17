import { Outlet, useLocation } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import Header from "./components/Layouts/Header";
import FooterNav from "./components/Layouts/FooterNav";

function App() {
  const location = useLocation()

  return (
    <>
      <Header position="fixed" />

      {
        location.pathname === '/' ? <HomePage /> : <Outlet />
      }

      {
        location.pathname === '/' ? <FooterNav search={true} /> : <FooterNav />
      }
    </>
  )
}

export default App;
