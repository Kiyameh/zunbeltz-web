import type { UTMCoordinates } from "@/types/navarra/shared.types";
import styles from "./CoordinatesDisplay.module.css";

interface CoordinatesDisplayProps {
  coordinates: UTMCoordinates;
  showUTM?: boolean;
  showLatLong?: boolean;
  showAltitude?: boolean;
}

export default function CoordinatesDisplay({
  coordinates,
  showUTM = true,
  showLatLong = true,
  showAltitude = true,
}: CoordinatesDisplayProps) {
  const formatLatLong = (lat: number, long: number) => {
    const latDir = lat >= 0 ? "N" : "S";
    const longDir = long >= 0 ? "E" : "O";
    return `${Math.abs(lat).toFixed(5)}° ${latDir}, ${Math.abs(long).toFixed(5)}° ${longDir}`;
  };

  return (
    <div className={styles.container}>
      {showUTM && (
        <div className={styles.item}>
          <span className={styles.label}>UTM:</span>
          <span className={styles.value}>
            {coordinates.zone}
            {coordinates.hemisphere} {coordinates.easting.toLocaleString()} E,{" "}
            {coordinates.northing.toLocaleString()} N
          </span>
        </div>
      )}

      {showLatLong && (
        <div className={styles.item}>
          <span className={styles.label}>Coordenadas:</span>
          <span className={styles.value}>
            {formatLatLong(coordinates.latitude, coordinates.longitude)}
          </span>
        </div>
      )}

      {showAltitude && coordinates.altitude !== undefined && (
        <div className={styles.item}>
          <span className={styles.label}>Altitud:</span>
          <span className={styles.value}>{coordinates.altitude} m</span>
        </div>
      )}
    </div>
  );
}
