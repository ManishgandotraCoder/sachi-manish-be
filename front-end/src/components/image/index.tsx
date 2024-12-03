import { useEffect, useState } from "react";

const final = [
  "Professional Coder",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
];

const ImageComponent = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [stringIndex, setStringIndex] = useState(0);
  const [adding, setAdding] = useState(true);

  useEffect(() => {
    const updateText = () => {
      const currentString = final[stringIndex];
      const nextIndex = adding ? index + 1 : index - 1;

      setText(currentString.slice(0, nextIndex));
      setIndex(nextIndex);

      if (adding && nextIndex === currentString.length) {
        setAdding(false);
      } else if (!adding && nextIndex === 0) {
        setAdding(true);
        setStringIndex((prev) => (prev + 1) % final.length);
      }
    };

    const interval = setInterval(updateText, 100);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [index, adding, stringIndex]);

  return (
    <div className="main-bg">
      <div className="mid-bg">
        <div className="head-content">
          <div className="inner">
            <h1>
              <span
                style={{
                  color: "white",
                  fontSize: "150%",
                  fontWeight: "bold",
                  marginTop: "100px",
                }}
              >
                MANISH GANDOTRA
              </span>
            </h1>
            <br />
            <h3>
              <span
                style={{
                  color: "white",
                  fontSize: "75%",
                  fontWeight: "bold",
                }}
              >
                I'am a <span style={{ color: "#ff014f" }}>{text}</span>
              </span>
            </h3>
            <br />
          </div>
          <a className="rn-btn shadow-none" href="#contact">
            <span>CONTACT ME</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
