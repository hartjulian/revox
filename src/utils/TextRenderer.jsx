import React from "react";

function parseMarkdown(text, paragraphClass) {
  const parts = [];
  // Match [text](url), bare URLs, bold (**text** or __text__), and italics (*text* or _text_)
  const regex =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)|(\*\*|__)(.*?)\4|(\*|_)(.*?)\6/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push plain text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // [text](url)
      parts.push(
        <a
          key={match[2] + match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // bare URL
      parts.push(
        <a
          key={match[3] + match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[3]}
        </a>
      );
    } else if (match[4] && match[5]) {
      // **bold** or __bold__
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[5]}
        </strong>
      );
    } else if (match[6] && match[7]) {
      // *italic* or _italic_
      parts.push(
        <em key={match.index} className="italic">
          {match[7]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push any text remaining after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function TextRenderer({ text, paragraphClass }) {
  // Replace &amp; , &lt; , and &gt; with &, <, and >
  const formattedText = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&#x200B;/g,'');

  // Split into paragraphs at newlines (\n)
  const paragraphs = formattedText.split(/\n+/);

  return (
    <div className={paragraphClass}>
      {paragraphs.map((para, i) => (
        <p key={i}>{parseMarkdown(para)}</p>
      ))}
    </div>
  );
}

