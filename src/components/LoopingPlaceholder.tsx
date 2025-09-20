import { useEffect, useState } from "react";

export default function LoopingPlaceholder() {
  const texts: string[] = [
    "Create a template for my next lecture...",
    "Generate study notes for CS101...",
    "Summarize today's reading assignment...",
    "Create a quiz for Chapter 5...",
    "Write discussion questions for class...",
  ];

  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [subIndex, setSubIndex] = useState<number>(0);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && subIndex < current.length) {
      timeout = setTimeout(() => setSubIndex(subIndex + 1), 100);
    } else if (deleting && subIndex > 0) {
      timeout = setTimeout(() => setSubIndex(subIndex - 1), 50);
    } else if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    setDisplayText(current.substring(0, subIndex));
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, texts]);

  return <span>{displayText}</span>;
}
