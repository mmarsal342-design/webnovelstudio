import React, { useState } from 'react';
import { KeyIcon } from './icons/KeyIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onClose }) => {
  const [key, setKey] = useState('');
  const { t } = useLanguage();

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card max-w-lg w-full text-center space-y-6 relative" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto w-14 h-14 flex items-center justify-center bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/30 shadow">
            <KeyIcon className="w-7 h-7 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--color-primary)] drop-shadow-sm">{t('apiKeyModal.title')}</h2>
        <p className="text-base text-gray-500 mb-2">{t('apiKeyModal.instruction')}</p>
        <div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder={t('apiKeyModal.placeholder')}
            className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-lg p-3 border border-gray-200 shadow focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition duration-200"
            autoFocus
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-primary)] hover:text-[var(--color-secondary)] mt-2 inline-block"
          >
            {t('apiKeyModal.getApiKey')}
          </a>
        </div>
        <button
          onClick={handleSave}
          disabled={!key.trim()}
          className="btn w-full flex items-center justify-center gap-2 py-3 px-6 text-lg font-bold disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          {t('apiKeyModal.saveButton')}
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[var(--color-primary)] text-xl font-bold bg-transparent border-none cursor-pointer"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;