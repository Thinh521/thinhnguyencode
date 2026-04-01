import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TypingLoop — smooth typewriter with character-level animation
 *
 * Props:
 *  words         — array of strings to cycle through
 *  typingSpeed   — ms per character when typing   (default 75)
 *  deletingSpeed — ms per character when deleting (default 35)
 *  pause         — ms to hold completed word      (default 1400)
 *  className     — extra classes on the wrapper
 */
export default function TypingLoop({
  words = ["Thịnh Nguyễn", "Frontend Developer", "thinh.dev"],
  typingSpeed = 75,
  deletingSpeed = 35,
  pause = 1400,
  className = "",
}) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const current = words[wordIdx];

  useEffect(() => {
    if (isPaused) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        /* typing forward */
        if (charCount < current.length) {
          setCharCount((c) => c + 1);
        } else {
          /* finished typing — pause then delete */
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pause);
        }
      } else {
        /* deleting */
        if (charCount > 0) {
          setCharCount((c) => c - 1);
        } else {
          /* finished deleting — move to next word */
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [
    charCount,
    isDeleting,
    isPaused,
    current,
    typingSpeed,
    deletingSpeed,
    pause,
    words.length,
  ]);

  const displayed = current.slice(0, charCount);

  return (
    <>
      <style>{`
        @keyframes caretBlink {
          0%, 45%  { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        .typing-caret {
          display: inline-block;
          width: 2px;
          border-radius: 1px;
          background: currentColor;
          margin-left: 3px;
          vertical-align: baseline;
          animation: caretBlink 1s ease-in-out infinite;
        }
      `}</style>

      <span className={`inline-flex items-baseline ${className}`}>
        {/* Characters — each fades in individually */}
        <AnimatePresence mode="popLayout" initial={false}>
          {displayed.split("").map((char, i) => (
            <motion.span
              key={`${wordIdx}-${i}`}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
              transition={{
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Caret */}
        <span
          className="typing-caret"
          style={{ height: "0.85em", alignSelf: "center" }}
          aria-hidden="true"
        />
      </span>
    </>
  );
}
