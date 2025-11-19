import React from 'react';
import { StoryEncyclopedia } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FilePlusIcon } from './icons/FilePlusIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { KeyIcon } from './icons/KeyIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  stories: StoryEncyclopedia[];
  onSelectStory: (storyId: string) => void;
  onEditStory: (storyId: string) => void;
  onDeleteStory: (storyId: string) => void;
  onStartNew: () => void;
  onImportStory: () => void;
  onExportStory: (storyId: string) => void;
  onGoToUniverseHub: () => void;
  onChangeApiKey: () => void;
}

const StoryCard: React.FC<{
    story: StoryEncyclopedia;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onExport: () => void;
}> = ({ story, onSelect, onEdit, onDelete, onExport }) => {
    const { t } = useLanguage();
    const genres = [...story.genres, story.otherGenre].filter(Boolean).join(', ');

    return (
        <div className="card flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-[var(--color-primary)] truncate mb-1" title={story.title}>{story.title}</h3>
                <p className="text-xs text-gray-500 mb-2 truncate flex items-center" title={story.universeName}>
                  <GlobeIcon className="w-3 h-3 inline -mt-1 mr-1 text-[var(--color-accent)]" />
                  {story.universeName}
                </p>
                <p className="text-sm text-[var(--color-secondary)] font-medium mb-2 truncate" title={genres}>{genres || t('dashboard.noGenres')}</p>
                <p className="text-xs text-gray-500 line-clamp-2" title={story.mainPlot}>
                    {story.mainPlot || t('dashboard.noPlot')}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between gap-2">
              <button 
                onClick={onSelect} 
                className="btn flex-grow text-center flex items-center justify-center gap-2"
              >
                <BookOpenIcon className="w-4 h-4" />
                {t('dashboard.openStudio')}
              </button>
              <div className="flex items-center shrink-0 gap-1 bg-gray-100 rounded-md">
                <button onClick={onEdit} className="p-2 text-gray-500 hover:text-[var(--color-primary)] rounded-md transition-colors" title={t('dashboard.editStory')}>
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button onClick={onExport} className="p-2 text-gray-500 hover:text-[var(--color-secondary)] rounded-md transition-colors" title={t('dashboard.exportStory')}>
                  <DownloadIcon className="w-4 h-4" />
                </button>
                <button onClick={onDelete} className="p-2 text-gray-500 hover:text-rose-400 rounded-md transition-colors" title={t('dashboard.deleteStory')}>
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ stories, onSelectStory, onEditStory, onDeleteStory, onStartNew, onImportStory, onExportStory, onGoToUniverseHub, onChangeApiKey }) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{t('dashboard.title')}</h2>
            <p className="text-gray-500 mt-1 text-lg">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
             <button
                onClick={onGoToUniverseHub}
                className="btn flex items-center gap-2"
                title={t('dashboard.universeHubTooltip')}
            >
                <GlobeIcon className="w-5 h-5" />
                {t('dashboard.universeHub')}
            </button>
            <button
                onClick={onStartNew}
                className="btn flex items-center gap-2"
            >
                <FilePlusIcon className="w-5 h-5" />
                {t('dashboard.startNewStory')}
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">{t('dashboard.storyLibrary')}</h3>
        
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                onSelect={() => onSelectStory(story.id)}
                onEdit={() => onEditStory(story.id)}
                onDelete={() => onDeleteStory(story.id)}
                onExport={() => onExportStory(story.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16 flex flex-col items-center">
            <BookOpenIcon className="mx-auto w-16 h-16 text-[var(--color-primary)] opacity-70" />
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-primary)]">{t('dashboard.emptyLibraryTitle')}</h3>
            <p className="mt-1 text-gray-500 text-lg">{t('dashboard.emptyLibrarySubtitle')}</p>
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
                onClick={onImportStory}
                className="btn bg-[var(--color-accent)] text-white flex items-center gap-2"
                title={t('dashboard.importStoryTooltip')}
            >
                <UploadIcon className="w-4 h-4" />
                {t('dashboard.importStory')}
            </button>
             <button
                onClick={onChangeApiKey}
                className="btn bg-gray-200 text-[var(--color-primary)] flex items-center gap-2"
                title={t('dashboard.changeApiKey')}
            >
                <KeyIcon className="w-4 h-4" />
                {t('dashboard.changeApiKey')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;