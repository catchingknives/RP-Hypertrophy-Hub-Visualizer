"use client";

import { useRef } from "react";
import { User } from "lucide-react";
import AboutDialog from "./about-dialog";

export default function NavBar() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <nav style={styles.toolbar}>
        <div style={styles.titleFlex}>RP Hypertrophy Hub</div>
        <span style={styles.spacer} />
        <button style={styles.aboutButton} onClick={() => dialogRef.current?.showModal()}>
          <span style={styles.smallText}>About</span>
          <User size={18} color="var(--text-secondary)" />
        </button>
      </nav>
      <AboutDialog ref={dialogRef} />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    height: 56,
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--border)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  titleFlex: {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    fontSize: "1rem",
  },
  spacer: {
    flex: "1 1 auto",
  },
  aboutButton: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 4,
  },
  smallText: {
    fontSize: "small",
    color: "var(--text-secondary)",
  },
};
