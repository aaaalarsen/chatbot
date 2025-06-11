import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type TypewriterStyle =
  | "simple"
  | "variable-speed"
  | "block"
  | "fade"
  | "cursor";

interface TypewriterTextProps {
  text: string;
  style: TypewriterStyle;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  style,
  onComplete,
  className,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [opacity, setOpacity] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 文節に分割する関数
  const splitIntoBlocks = (text: string) => {
    // 簡易的な文節分割（句読点、空白、記号で分割）
    return text.match(/[。、！？．，\s]|[^。、！？．，\s]+/g) || [];
  };

  useEffect(() => {
    setDisplayText("");
    setOpacity(0);
    setIsComplete(false);

    const blocks = splitIntoBlocks(text);
    let currentIndex = 0;
    let currentBlockIndex = 0;

    const getDelay = (char: string) => {
      if (style === "variable-speed") {
        // 句読点での遅延を長めに
        if ("。、！？．，".includes(char)) return 500;
        return Math.random() * 50 + 30;
      }
      return 50; // デフォルトの遅延
    };

    const animate = () => {
      if (style === "block") {
        if (currentBlockIndex < blocks.length) {
          setDisplayText((prev) => prev + blocks[currentBlockIndex]);
          currentBlockIndex++;
          timeoutRef.current = setTimeout(animate, 200);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      } else if (style === "fade") {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setOpacity((prev) => Math.min(1, prev + 0.1));
          currentIndex++;
          timeoutRef.current = setTimeout(animate, 50);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      } else {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex]);
          currentIndex++;
          const delay = getDelay(text[currentIndex - 1]);
          timeoutRef.current = setTimeout(animate, delay);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      }
    };

    timeoutRef.current = setTimeout(animate, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, style, onComplete]);

  const containerStyle: React.CSSProperties = {
    minHeight: text.split("\n").length * 1.5 + "em",
    position: "relative",
  };

  const textStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  };

  if (style === "cursor") {
    return (
      <div className={cn("relative", className)} style={containerStyle}>
        <span
          style={textStyle}
          className={cn(
            "transition-opacity duration-200",
            !isComplete &&
              "after:content-['|'] after:animate-blink after:ml-0.5"
          )}
        >
          {displayText}
        </span>
        <span className="invisible">{text}</span>
      </div>
    );
  }

  if (style === "fade") {
    return (
      <div
        className={cn("transition-opacity duration-200", className)}
        style={{ ...containerStyle, opacity: opacity }}
      >
        <span style={textStyle}>{displayText}</span>
        <span className="invisible">{text}</span>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <span style={textStyle}>{displayText}</span>
      <span className="invisible">{text}</span>
    </div>
  );
};
