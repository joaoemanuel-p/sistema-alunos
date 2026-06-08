import "./Layout.css";
import Navbar from "../Navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;