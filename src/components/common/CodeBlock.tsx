import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type CodeBlockProps = {
  code: string;
  language?: string;
  variant?: 'default' | 'error' | 'success';
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
};

export const CodeBlock = ({
  code,
  language = 'jsx',
  variant = 'default',
  title,
  collapsible = true,
  defaultExpanded = false,
}: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const variantStyles = {
    default: {
      headerBg: 'bg-gray-900',
      headerText: 'text-gray-100',
      border: 'border-gray-700',
      codeBg: 'rgb(30, 30, 30)',
    },
    error: {
      headerBg: 'bg-red-950/50',
      headerText: 'text-red-400',
      border: 'border-red-900/50',
      codeBg: 'rgb(127, 29, 29)',
    },
    success: {
      headerBg: 'bg-green-950/50',
      headerText: 'text-green-400',
      border: 'border-green-900/50',
      codeBg: 'rgb(20, 83, 45)',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      <div className={`flex items-center justify-between p-4 ${styles.headerBg}`}>
        <h4 className={`${styles.headerText} font-bold flex items-center gap-2`}>
          <Code2 size={20} />
          {title && <span className="font-mono text-sm">{title}</span>}
        </h4>
        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${styles.headerText} hover:opacity-80 flex items-center gap-2 text-xs transition-colors`}
          >
            {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
            {isExpanded ? 'Hide Code' : 'Show Code'}
          </button>
        )}
      </div>

      {(isExpanded || !collapsible) && (
        <div className={`border-t ${styles.border}`}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              backgroundColor: styles.codeBg,
              fontSize: '0.75rem',
              borderRadius: '0',
              margin: 0,
              padding: '1rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};