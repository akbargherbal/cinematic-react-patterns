import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  variant?: "default" | "error" | "success";
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
};

export const CodeBlock = ({
  code,
  language = "jsx",
  variant = "default",
  title,
  collapsible = true,
  defaultExpanded = false,
}: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const variantStyles = {
    default: {
      headerBg: "bg-gray-900/80",
      headerText: "text-gray-100",
      border: "border-gray-700",
      codeBg: "rgba(30, 30, 30, 0.85)",
    },
    error: {
      headerBg: "bg-red-800/50",
      headerText: "text-red-100",
      border: "border-red-900/50",
      codeBg: "rgba(165, 12, 53, 0.1)",
    },
    success: {
      headerBg: "bg-green-800/50",
      headerText: "text-green-100",
      border: "border-green-900/50",
      codeBg: "rgba(128, 203, 196, 0.1)",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="overflow-hidden rounded-2xl bg-gray-900/70 shadow-xl">
      <div
        className={`flex items-center justify-between p-4 ${styles.headerBg}`}
      >
        <h4
          className={`${styles.headerText} flex items-center gap-2 font-bold`}
        >
          <Code2 size={20} />
          {title && <span className="px-2 font-mono text-sm">{title}</span>}
        </h4>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className={`${styles.headerText} flex items-center gap-2 text-xs transition-all hover:opacity-80`}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>

          {collapsible && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${styles.headerText} flex items-center gap-2 text-xs transition-colors hover:opacity-80`}
            >
              {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
              {isExpanded ? "Hide" : "Show"}
            </button>
          )}
        </div>
      </div>

      {(isExpanded || !collapsible) && (
        <div className={`border-t ${styles.border}`}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              backgroundColor: styles.codeBg,
              fontSize: "0.75rem",
              borderRadius: "0",
              margin: 0,
              padding: "1rem",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};
