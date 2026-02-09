import Link from "next/link";
import type { VolumeLandmark } from "@/types";

interface MuscleTableProps {
  data: VolumeLandmark[];
  clickable?: boolean;
}

export default function MuscleTable({ data, clickable = false }: MuscleTableProps) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Muscle</th>
            <th style={styles.th}><abbr title="Maintenance Volume">MV</abbr></th>
            <th style={styles.th}><abbr title="Minimum Effective Volume">MEV</abbr></th>
            <th style={styles.th}><abbr title="Maximum Adaptive Volume">MAV</abbr></th>
            <th style={styles.th}><abbr title="Maximum Recoverable Volume">MRV</abbr></th>
            <th style={styles.th}>Freq</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mg) => {
            const row = (
              <tr key={mg.Muscle} style={clickable ? styles.clickableRow : undefined}>
                <td style={{ ...styles.td, fontWeight: 600, color: "var(--rp-color)" }}>
                  {mg.Muscle}
                </td>
                <td style={styles.td}>{mg.MV}</td>
                <td style={styles.td}>{mg.MEV}</td>
                <td style={styles.td}>{mg.MAV}</td>
                <td style={styles.td}>{mg.MRV}</td>
                <td style={styles.td}>{mg.Freq}</td>
              </tr>
            );

            if (clickable) {
              return (
                <Link
                  key={mg.Muscle}
                  href={`/${mg.Muscle}`}
                  style={{ display: "contents" }}
                >
                  {row}
                </Link>
              );
            }

            return row;
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    margin: "12px auto 0",
    overflow: "auto",
    borderRadius: 8,
    backgroundColor: "var(--surface)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderStyle: "none",
  },
  th: {
    textAlign: "center",
    color: "var(--text-secondary)",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "12px 8px",
    minWidth: 50,
    borderBottom: "1px solid var(--border)",
  },
  td: {
    textAlign: "center",
    padding: "12px 8px",
    borderBottom: "1px solid var(--border)",
  },
  clickableRow: {
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
};
