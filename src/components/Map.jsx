import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const navigate = useNavigate();

  const [searchParam, setSearch] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>

      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
};

export default Map;
