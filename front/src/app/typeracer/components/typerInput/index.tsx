'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './react-quill.css';
import { TyperInputPayload } from '../../../types/typerInput';
import React from 'react';
import { ProcessKey } from '../../..//types/manager';

export const formatRichText = (text: string, position: number) => {
  const start = text?.slice(0, position) ?? '';
  const emphasis = text?.slice(position, position + 1) ?? '';
  const end = text?.slice(position + 1) ?? '';
  return `${start}<strong>${emphasis === ' ' ? '·' : emphasis}</strong>${end}`;
};

const TyperInput = ({
  typerInputPayload,
  onProcessKey,
  doReset,
  doFinish
}: {
  typerInputPayload: TyperInputPayload;
  onProcessKey: (process: ProcessKey) => void;
  doReset: () => void;
  doFinish: (now: number, chars: number, words: number) => void;
}) => {
  const {
    context: { baseText }
  } = typerInputPayload;

  const [active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [richText, setRichText] = useState(
    formatRichText(baseText.toLowerCase(), position)
  );

  const quillRef = useMemo(() => {
    return React.createRef<ReactQuill>();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toogleActive = useCallback(
    (isFocus: boolean = false) => {
      if (!active) {
        setActive(true);
        setPosition(0);
        return quillRef.current?.focus();
      }
      if (!isFocus) {
        setActive(false);
        return quillRef.current?.blur();
      }
    },
    [active, quillRef]
  );
  useEffect(() => {
    if (active) {
      const isCorrect =
        currentKey?.toLowerCase() === baseText[position].toLowerCase();

      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          toogleActive();
          doReset();
        }, 3000)
      );
      currentKey !== null &&
        onProcessKey({
          key: currentKey!,
          time: performance.now(),
          isCorrect
        });
      if (isCorrect) {
        if (position === baseText.length - 1) {
          doFinish(
            performance.now(),
            baseText.length,
            baseText.split(' ').length
          );
          return;
        }
        setPosition(position + 1);
      }
      setRichText(formatRichText(baseText.toLowerCase(), position));

      setCurrentKey(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, baseText, position, currentKey]);

  function onKeydown({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      return toogleActive();
    }
    setCurrentKey(key);
  }
  const onFocus = () => {
    toogleActive(true);
  };

  const onBlur = () => {
    toogleActive();
  };

  return (
    <div onClick={() => toogleActive(true)}>
      {document && typeof document !== 'undefined' && (
        <ReactQuill
          ref={quillRef}
          className={active ? 'ql-active' : 'ql-inactive'}
          theme="snow"
          value={richText}
          readOnly={true}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default TyperInput;
