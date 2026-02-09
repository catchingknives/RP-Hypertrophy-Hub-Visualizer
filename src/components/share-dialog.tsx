"use client";

import { forwardRef, useEffect, useState } from "react";

const ShareDialog = forwardRef<HTMLDialogElement>(function ShareDialog(_, ref) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function copyToClipboard() {
    const currentUrl = window.location.href;
    setUrl(currentUrl);
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <dialog ref={ref} style={styles.dialog} onClick={(e) => {
      if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close();
    }}>
      <div>
        <div style={styles.header}>
          <div style={styles.headerTitle}>Share</div>
        </div>
        <hr style={styles.divider} />
        <div style={styles.urlHolder}>
          {url}
        </div>
        <div className="button-group" style={{ marginTop: 20 }}>
          <button className="button-green" onClick={copyToClipboard}>
            {copied ? "COPIED!" : "COPY URL"}
          </button>
          <button
            className="button-blue"
            onClick={() => (ref as React.RefObject<HTMLDialogElement>)?.current?.close()}
          >
            CLOSE
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ShareDialog;

const styles: Record<string, React.CSSProperties> = {
  dialog: {
    border: "none",
    borderRadius: 8,
    padding: 20,
    maxWidth: 575,
    width: "95%",
    minWidth: 290,
  },
  header: {
    paddingBottom: 7,
  },
  headerTitle: {
    width: "100%",
    fontSize: "large",
    textAlign: "center",
    fontWeight: "bold",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--border)",
  },
  urlHolder: {
    width: "90%",
    display: "block",
    margin: "10px auto 0",
    textAlign: "center",
    wordBreak: "break-all",
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
  },
};
