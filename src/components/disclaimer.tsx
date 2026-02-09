export default function Disclaimer() {
  return (
    <div style={styles.disclaimer}>
      {"I am not affiliated with "}
      <a href="https://rpstrength.com/" target="_blank" rel="noopener noreferrer">
        Renaissance Periodization
      </a>
      {" (RP) and take no credit for their work. This tool is open source and if you're interested, here is the "}
      <a
        href="https://github.com/catchingknives/RP-Hypertrophy-Hub-Visualizer"
        target="_blank"
        rel="noopener noreferrer"
      >
        source code
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  disclaimer: {
    marginTop: 24,
    paddingBottom: 24,
    color: "var(--text-secondary)",
    fontSize: "small",
    textAlign: "center",
  },
};
