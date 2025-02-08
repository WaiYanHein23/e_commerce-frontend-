import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import Container from "../components/Container";

const RootLayout = () => {
  return (
    <div className="container mx-auto px-10 border">
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
};

export default RootLayout;
