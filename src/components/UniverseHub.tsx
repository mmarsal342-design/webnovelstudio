import React from 'react';
import { Universe } from '../types';
import { GlobeIcon } from './icons/GlobeIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FilePlusIcon } from './icons/FilePlusIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { LayoutDashboardIcon } from './icons/LayoutDashboardIcon';
import { StarIcon } from './icons/StarIcon';
import { useLanguage } from '../contexts/LanguageContext';


interface UniverseHubProps {
  universes: Universe[];
  onGoToDashboard: () => void;
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  onImport: () => void;
  onToggleFavorite: (id: string) => void;
}

const UniverseCard: React.FC<{
    universe: Universe;
    onEdit: () => void;
    onDelete: () => void;
    onExport: () => void;
    onToggleFavorite: () => void;
}> = ({ universe, onEdit, onDelete, onExport, onToggleFavorite }) => {
    const { t } = useLanguage();
    return (
        <div className="card flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-[var(--color-primary)] truncate mb-1" title={universe.name}>{universe.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-3" title={universe.description}>
                  {universe.description || t('universeHub.noDescription')}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-end gap-2">
               <button 
                onClick={onToggleFavorite} 
                className={`p-2 text-gray-500 ${universe.isFavorite ? 'text-amber-400' : 'hover:text-amber-400'} bg-gray-100 rounded-md transition-colors`} 
                title={universe.isFavorite ? "Remove from favorites" : "Add to favorites"}
               >
                <StarIcon className="w-4 h-4" filled={!!universe.isFavorite} />
              </button>
               <button onClick={onEdit} className="p-2 text-gray-500 hover:text-[var(--color-primary)] bg-gray-100 rounded-md transition-colors" title={t('universeHub.edit')}>
                <PencilIcon className="w-4 h-4" />
              </button>
              <button onClick={onExport} className="p-2 text-gray-500 hover:text-[var(--color-secondary)] bg-gray-100 rounded-md transition-colors" title={t('universeHub.export')}>
                <DownloadIcon className="w-4 h-4" />
              </button>
              <button onClick={onDelete} className="p-2 text-gray-500 hover:text-rose-400 bg-gray-100 rounded-md transition-colors" title={t('universeHub.delete')}>
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
        </div>
    );
};


const UniverseHub: React.FC<UniverseHubProps> = ({ universes, onGoToDashboard, onAddNew, onEdit, onDelete, onExport, onImport, onToggleFavorite }) => {
  const { t } = useLanguage();
  const sortedUniverses = [...universes].sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)] flex items-center gap-3"><GlobeIcon className="w-8 h-8 text-[var(--color-primary)]"/> {t('universeHub.title')}</h2>
            <p className="text-gray-500 mt-1 text-lg">{t('universeHub.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={onGoToDashboard}
                className="btn flex items-center gap-2"
            >
                <LayoutDashboardIcon className="w-5 h-5" />
                {t('universeHub.backToDashboard')}
            </button>
            <button
                onClick={onAddNew}
                className="btn flex items-center gap-2"
            >
                <FilePlusIcon className="w-5 h-5" />
                {t('universeHub.createNew')}
            </button>
          </div>
        </div>
        
        {sortedUniverses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedUniverses.map(universe => (
              <UniverseCard
                key={universe.id}
                universe={universe}
                onEdit={() => onEdit(universe.id)}
                onDelete={() => onDelete(universe.id)}
                onExport={() => onExport(universe.id)}
                onToggleFavorite={() => onToggleFavorite(universe.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16 flex flex-col items-center">
            <GlobeIcon className="mx-auto w-16 h-16 text-[var(--color-primary)] opacity-70" />
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-primary)]">{t('universeHub.emptyTitle')}</h3>
            <p className="mt-1 text-gray-500 text-lg">{t('universeHub.emptySubtitle')}</p>
          </div>
        )}
        <div className="mt-8 text-center">
            <button
                onClick={onImport}
                className="btn bg-[var(--color-accent)] text-white flex items-center gap-2 mx-auto"
                title={t('universeHub.importTooltip')}
            >
                <UploadIcon className="w-4 h-4" />
                {t('universeHub.import')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default UniverseHub;