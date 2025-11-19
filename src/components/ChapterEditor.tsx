import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chapter } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface ChapterEditorProps {
  chapter: Chapter;
  language: 'en' | 'id'; // Content language
  onUpdate: (chapterId: string, title: string, content: string) => void;
}

type SaveStatus = 'idle' | 'editing' | 'saved';

const ChapterEditor: React.FC<ChapterEditorProps> = ({ chapter, language, onUpdate }) => {
  const [title, setTitle] = useState(chapter.title);
  const [content, setContent] = useState(chapter.content);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimeoutRef = useRef<number | null>(null);
  const statusTimeoutRef = useRef<number | null>(null);
  const { t } = useLanguage();

  // When the chapter prop changes (user selects a different chapter),
  // reset the internal state.
  useEffect(() => {
    setTitle(chapter.title);
    setContent(chapter.content);
    setSaveStatus('idle'); // Reset status on chapter change
  }, [chapter]);

  // Debounced save effect
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
    }

    // Set status to editing only if there's a change from the source prop
    if (title !== chapter.title || content !== chapter.content) {
        setSaveStatus('editing');
    }

    saveTimeoutRef.current = window.setTimeout(() => {
        // Only call update if there's an actual change
        if (title !== chapter.title || content !== chapter.content) {
            onUpdate(chapter.id, title, content);
            setSaveStatus('saved');
            
            statusTimeoutRef.current = window.setTimeout(() => {
                setSaveStatus('idle');
            }, 2000); // Show 'Saved' for 2 seconds
        }
    }, 750); // Save after 750ms of inactivity

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, [title, content, chapter, onUpdate]);
  
  const wordCount = useMemo(() => {
    if (!content) return 0;
    // Match words (sequences of non-space characters)
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const renderStatus = () => {
    switch (saveStatus) {
      case 'editing':
        return <span className="text-slate-400 italic">{t('chapterEditor.statusEditing')}</span>;
      case 'saved':
        return <span className="text-green-400 flex items-center gap-1"><CheckIcon className="w-4 h-4" /> {t('chapterEditor.statusSaved')}</span>;
      case 'idle':
      default:
        return null;
    }
  };

  return (
    <div className="card flex flex-col h-full max-h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white/60">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={language === 'id' ? 'Judul Bab' : 'Chapter Title'}
          className="w-full bg-transparent text-2xl font-extrabold text-[var(--color-primary)] placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className="flex-grow p-1 overflow-y-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={language === 'id' ? 'Mulai tulis bab Anda di sini...' : 'Start writing your chapter here...'}
          className="w-full h-full bg-gray-50 text-gray-700 placeholder-gray-400 p-4 resize-none focus:outline-none text-base leading-relaxed rounded-lg shadow-sm border border-gray-200"
        />
      </div>
      <div className="flex-shrink-0 p-2 px-4 border-t border-gray-200 bg-white/60 text-xs text-gray-500 flex justify-between items-center">
        <span className="font-medium text-[var(--color-secondary)]">{t('chapterEditor.wordCount')}: {wordCount}</span>
        <div className="h-4">
            {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default ChapterEditor;