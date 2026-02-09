import { VOLUME_LANDMARKS } from "@/data/volume-landmarks";
import MuscleTable from "@/components/muscle-table";
import Disclaimer from "@/components/disclaimer";

export default function HomePage() {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <div style={styles.pageTitleHolder}>
          <h2 style={styles.tableHeader}>Hypertrophy Training Landmarks</h2>
        </div>
        <hr style={styles.divider} />
        <div style={styles.tableDescription}>
          {"If you're not familiar with the volume landmarks, read this "}
          <a
            href="https://rpstrength.com/blogs/articles/training-volume-landmarks-muscle-growth"
            target="_blank"
            rel="noopener noreferrer"
          >
            article
          </a>
          {", otherwise this tool wont make sense. Click on a row in the table to view the in-depth recommendations for that muscle group. The units for the cells in the following table is "}
          <em>sets per week</em>
          {" except for Frequency which is "}
          <em>sessions per week</em>.
        </div>
      </div>
      <MuscleTable data={VOLUME_LANDMARKS} clickable />
      <Disclaimer />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1200,
    minWidth: 300,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  card: {
    background: "var(--surface)",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    padding: "4px 0",
  },
  pageTitleHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  },
  tableHeader: {
    margin: 0,
    padding: 10,
    fontSize: "1.25rem",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--border)",
    margin: "0 10px",
  },
  tableDescription: {
    width: "90%",
    margin: "0 auto",
    padding: "10px 0",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
};
