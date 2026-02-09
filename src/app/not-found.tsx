import Link from "next/link";

export default function NotFound() {
  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>That muscle group doesn&apos;t exist.</p>
      <Link href="/" style={styles.link}>
        Back to all muscle groups
      </Link>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: "80px auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "3rem",
    color: "var(--text-secondary)",
  },
  text: {
    color: "var(--text-secondary)",
    marginTop: 8,
  },
  link: {
    display: "inline-block",
    marginTop: 24,
    color: "var(--rp-color)",
    fontWeight: 500,
  },
};
