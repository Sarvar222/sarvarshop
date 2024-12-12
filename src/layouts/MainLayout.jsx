import { Navbar, ColorContainer } from "../components/index";
// rrd
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <Navbar />
      <ColorContainer />
      <main className="align-elements w-full">
        <Outlet />
      </main>
    </>
  );
}
export default MainLayout;