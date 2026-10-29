import SideBar from "../components/nav/SideBar";
import styles from "../components/css_modules/AppLayout.module.css";
import Map from "../components/nav/Map";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
