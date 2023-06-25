import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

export const CodeBlock = ({ code, language }) =&gt; {
  return (
    &lt;Highlight {...defaultProps} code={code} language={language}&gt;
      {({ className, style, tokens, getLineProps, getTokenProps }) =&gt; {
        return (
          &lt;pre className={className} style={style}&gt;
            <code>
                  {tokens.map((line, idx) => {
                    return (
                      <div {...getLineProps({ line, key: `line-${idx}` })}>
                        {line.map((token, i) => {
                          return (
                            <span
                              {...getTokenProps({ token, key: `token-${i}` })}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </code>
          &lt;/pre&gt;
        );
      }}
    &lt;/Highlight&gt;
  );
};
