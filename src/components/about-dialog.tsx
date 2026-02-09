"use client";

import { forwardRef } from "react";

const AboutDialog = forwardRef<HTMLDialogElement>(function AboutDialog(_, ref) {
  return (
    <dialog ref={ref} style={styles.dialog} onClick={(e) => {
      if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close();
    }}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.headerTitle}>About</div>
        </div>
        <hr style={styles.divider} />
        <div style={styles.profilePicture}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/RP-Hypertrophy-Hub-Visualizer/profile.jpg"
            alt="Profile Picture"
            style={styles.profileImg}
          />
        </div>
        <div style={styles.bio}>
          {"My names Ryan. I'm a full stack software developer who is passionate about training and nutrition. If you want to see other projects I am involved with or connect with me, check out my "}
          <a href="https://ryanlefebvre.github.io/TREE/" target="_blank" rel="noopener noreferrer">
            link tree
          </a>
          {" :)"}
        </div>
        <div style={styles.bio}>
          {"I made this page to summarize the "}
          <a href="https://rpstrength.com/" target="_blank" rel="noopener noreferrer">
            Renaissance Periodization
          </a>
          {" (RP) hypertrophy training volume recommendations. I'll refer people to their "}
          <a
            href="https://rpstrength.com/blogs/articles/hypertrophy-training-guide-central-hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            hypertrophy training hub
          </a>
          {" pretty often and one thing I'll always hear back is that people wish there was a table of all the volume landmarks in one spot."}
        </div>
        <div style={styles.bio}>
          That is what inspired me to make an easier way to visualize the landmarks myself. I want to
          make it clear that I am not affiliated with RP and take no credit for their work.
        </div>
        <div className="button-group" style={{ marginTop: 20 }}>
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

export default AboutDialog;

const styles: Record<string, React.CSSProperties> = {
  dialog: {
    border: "none",
    borderRadius: 8,
    padding: 20,
    maxWidth: 575,
    width: "95%",
    minWidth: 290,
  },
  wrapper: {},
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
  profilePicture: {
    display: "flex",
    justifyContent: "center",
    margin: "35px auto 20px",
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: "50%",
    objectFit: "cover",
  },
  bio: {
    marginTop: 10,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "small",
    lineHeight: 1.5,
  },
};
