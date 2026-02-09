"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import ShareDialog from "@/components/share-dialog";

interface MuscleDetailHeaderProps {
  muscleName: string;
}

export default function MuscleDetailHeader({ muscleName }: MuscleDetailHeaderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div style={styles.pageTitleHolder}>
        <h2 style={styles.tableHeader}>
          <Link href="/" style={styles.backLink}>
            <ArrowLeft size={22} color="var(--text-secondary)" />
          </Link>
          {muscleName} Training Landmarks
        </h2>
        <button style={styles.shareButton} onClick={() => dialogRef.current?.showModal()}>
          Share
          <Share2 size={16} />
        </button>
      </div>
      <ShareDialog ref={dialogRef} />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition: "color 0.15s ease",
  },
  shareButton: {
    borderWidth: 0,
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    fontWeight: 500,
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "color 0.15s ease",
    padding: "8px 12px",
  },
};
