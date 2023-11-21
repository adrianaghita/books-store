import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../App.scss";
function RoutesLayout() {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RoutesLayout;
