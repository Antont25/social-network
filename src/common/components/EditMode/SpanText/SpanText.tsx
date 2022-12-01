import React, { ReactElement } from 'react';

export const SpanText = ({ value, callback, className }: SpanTextType): ReactElement => {
  return (
    <span className={className} onDoubleClick={callback}>
      {value || 'нету даных'}
    </span>
  );
};
type SpanTextType = {
  value: string | null;
  className?: string;
  callback?: () => void;
};
