import "../styles/Attribution.css";

function Attribution() {
  return (
    <div className="attribution-div">
      <p className="attribution-p">
        Card images provided by the{" "}
        <a href={"https://ai-cats.net/"} target="_blank">
          AI Cats API
        </a>
        . Back face image generated using{" "}
        <a
          href="https://www.microsoft.com/en-us/microsoft-copilot"
          target="_blank"
        >
          Microsoft Copilot
        </a>
        . Loading icon from{" "}
        <a href="https://icons8.com/preloaders/" target="_blank">
          Icons8
        </a>
        .
      </p>
    </div>
  );
}

export default Attribution;
