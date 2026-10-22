import React from 'react';

// Seperti fillTemplate, tetapi penanda boleh diganti elemen, misalnya nama yang ditebalkan.
export function TemplateText({ template, values }: { template: string; values: Record<string, React.ReactNode> }) {
  return (
    <>
      {template.split(/(\{\w+\})/g).map((part, index) => {
        const key = part.match(/^\{(\w+)\}$/)?.[1];
        return <React.Fragment key={index}>{key && key in values ? values[key] : part}</React.Fragment>;
      })}
    </>
  );
}
