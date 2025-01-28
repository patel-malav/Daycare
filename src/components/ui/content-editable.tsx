import { useLayoutEffect, useRef } from "react";
import type { FocusEvent } from "react";

type Props = {
  label: string;
  defaultValue: string;
  className?: string;
  multiline?: boolean;
  inlineElement?: boolean;
  onChange: (value: Props["defaultValue"], label: Props["label"]) => void;
};

export default function ContentEditable({
  label,
  className,
  defaultValue,
  multiline,
  inlineElement,
  onChange,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const cleaned = cleanup(defaultValue, multiline);

  useLayoutEffect(() => {
    // Insert text before paint occurs
    if (ref.current === null || cleaned === null) return;
    ref.current.innerText = cleaned;
  }, []);

  const handleOnBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    const newContent = cleanup(e.target.innerText) ?? "";
    e.target.innerText = newContent;
    onChange(newContent, label);
  };

  if (inlineElement) {
    return (
      <span
        ref={ref}
        className={className}
        contentEditable
        onBlur={handleOnBlur}
      ></span>
    );
  }

  return (
    <p
      ref={ref}
      className={className}
      contentEditable
      onBlur={handleOnBlur}
    ></p>
  );
}

function cleanup(content: string | null, multiline: boolean = false) {
  if (content === null) return null;
  if (!multiline) return content.trim();
  const parts = content
    .split("\n")
    .map((part) => part.trim())
    .filter((part) => part !== "");
  return parts.join("\n");
}
