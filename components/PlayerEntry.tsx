// components/PlayerEntry.tsx
'use client';

import { useState, useRef } from 'react';
import { Player } from '@/lib/types';
import { translations, Language, getTranslationWithParams } from '@/lib/i18n';

interface PlayerEntryProps {
    players: Player[];
    onPlayerAdded: (player: Player) => void;
    onPlayerUpdated: (playerId: string, updatedPlayer: Player) => void;
    onPlayerDeleted: (playerId: string) => void;
    onPlayersImported: (players: Player[]) => void;
    language: Language;
    onNavigateToSchedule?: () => void;
}

export default function PlayerEntry({ players, onPlayerAdded, onPlayerUpdated, onPlayerDeleted, onPlayersImported, language, onNavigateToSchedule }: PlayerEntryProps) {
    const t = translations[language];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        surname: '',
        name: '',
        rating: '',
        federation: '',
        club: '',
        sex: '-'
    });

    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.surname || !formData.name) {
            alert(t.messages.errors.requiredFields || t.playerEntry.requiredFields);
            return;
        }

        if (editingPlayerId) {
            const player = players.find(p => p.id === editingPlayerId);
            if (player) {
                const updatedPlayer: Player = {
                    ...player,
                    title: formData.title,
                    surname: formData.surname,
                    name: formData.name,
                    rating: parseInt(formData.rating) || 0,
                    federation: formData.federation,
                    club: formData.club,
                    sex: formData.sex
                };
                onPlayerUpdated(editingPlayerId, updatedPlayer);
            }
            setEditingPlayerId(null);
        } else {
            const newPlayer: Player = {
                id: `player-${Date.now()}-${Math.random()}`,
                startNumber: players.length + 1,
                title: formData.title,
                surname: formData.surname,
                name: formData.name,
                rating: parseInt(formData.rating) || 0,
                federation: formData.federation,
                club: formData.club,
                sex: formData.sex
            };
            onPlayerAdded(newPlayer);
        }

        setFormData({
            title: '',
            surname: '',
            name: '',
            rating: '',
            federation: '',
            club: '',
            sex: '-'
        });
    };

    const handleEdit = (player: Player) => {
        setFormData({
            title: player.title,
            surname: player.surname,
            name: player.name,
            rating: player.rating.toString(),
            federation: player.federation,
            club: player.club,
            sex: player.sex
        });
        setEditingPlayerId(player.id);
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            surname: '',
            name: '',
            rating: '',
            federation: '',
            club: '',
            sex: '-'
        });
        setEditingPlayerId(null);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split('\n').filter(line => line.trim());

                const importedPlayers: Player[] = [];
                let startNumberCounter = players.length + 1; // ✅ ISPRAVKA: Počni od sljedećeg broja

                lines.forEach((line, index) => {
                    const parts = line.split(/[;\t]/).map(p => p.trim());

                    if (parts.length >= 3) {
                        const sanitize = (str: string) => str.replace(/[<>'"]/g, '').trim();

                        const newPlayer: Player = {
                            id: `player-${Date.now()}-${Math.random()}-${index}`, // ✅ ISPRAVKA: Dodaj ID
                            startNumber: startNumberCounter++, // ✅ ISPRAVKA: Dodjeli startNumber
                            title: sanitize(parts[0] || ''),
                            surname: sanitize(parts[1] || ''),
                            name: sanitize(parts[2] || ''),
                            rating: parseInt(parts[3]) || 0,
                            federation: sanitize(parts[4] || ''),
                            club: sanitize(parts[5] || ''),
                            sex: parts[6] || '-'
                        };
                        importedPlayers.push(newPlayer);
                    }
                });

                if (importedPlayers.length > 0) {
                    onPlayersImported(importedPlayers);
                    alert(getTranslationWithParams(language, 'playerEntry.importSuccess', { count: importedPlayers.length.toString() }));
                }
            } catch (error) {
                alert(t.playerEntry.importError);
            }
        };

        reader.readAsText(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleExport = () => {
        if (players.length === 0) {
            alert('No players to export!');
            return;
        }

        const lines = players.map(p =>
            `${p.title};${p.surname};${p.name};${p.rating};${p.federation};${p.club};${p.sex}`
        );

        const content = lines.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'players.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            {/* Forma za unos igrača */}
            <div className="bg-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600 p-4">
                <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t.playerEntry.playerData}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Prvi red - Broj, Titula, Prezime */}
                    <div className="grid grid-cols-4 gap-2">
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.number}</label>
                            <input
                                type="text"
                                disabled
                                value={editingPlayerId ? players.find(p => p.id === editingPlayerId)?.startNumber || '-' : players.length + 1}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-center text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.title_field}</label>
                            <select
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                <option value="">-</option>
                                <option value="GM">{t.playerEntry.titles.GM}</option>
                                <option value="IM">{t.playerEntry.titles.IM}</option>
                                <option value="FM">{t.playerEntry.titles.FM}</option>
                                <option value="CM">{t.playerEntry.titles.CM}</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.surname} *</label>
                            <input
                                type="text"
                                required
                                value={formData.surname}
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder={t.playerEntry.placeholders.surname}
                            />
                        </div>
                    </div>

                    {/* Drugi red - Ime, Rating, Pol */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.name} *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder={t.playerEntry.placeholders.name}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.rating}</label>
                            <input
                                type="number"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder={t.playerEntry.placeholders.rating}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.sex}</label>
                            <select
                                value={formData.sex}
                                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                <option value="-">-</option>
                                <option value="M">{t.playerEntry.male}</option>
                                <option value="F">{t.playerEntry.female}</option>
                            </select>
                        </div>
                    </div>

                    {/* Treći red - Federacija, Klub */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.federation}</label>
                            <input
                                type="text"
                                value={formData.federation}
                                onChange={(e) => setFormData({ ...formData, federation: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder={t.playerEntry.placeholders.federation}
                                maxLength={3}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">{t.playerEntry.club}</label>
                            <input
                                type="text"
                                value={formData.club}
                                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                                className="w-full px-2 py-1.5 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder={t.playerEntry.placeholders.club}
                            />
                        </div>
                    </div>

                    {/* Dugmad za dodavanje/azuriranje */}
                    {editingPlayerId ? (
                        <div className="flex gap-2 pt-1">
                            <button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
                            >
                                ✓ {t.playerEntry.update}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
                            >
                                ✕ {t.playerEntry.cancel}
                            </button>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors mt-1"
                        >
                            + {t.playerEntry.add}
                        </button>
                    )}
                </form>
            </div>

            {/* Lista igrača sa akcijama */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-md font-semibold text-white flex items-center gap-2">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {t.playerEntry.list}
                    </h3>
                    {players.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-400">
                            <span className="text-[10px]">{t.common.total}:</span>
                            <span className="text-base font-bold text-white">{players.length}</span>
                        </div>
                    )}
                </div>

                {/* ✅ ISPRAVKA: Dodaj max-height sa scroll */}
                <div className="bg-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-600 p-4 max-h-[400px] overflow-y-auto">
                    {players.length === 0 ? (
                        <div className="text-center py-4">
                            <svg className="w-8 h-8 text-slate-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75V21m0 0h-6m6 0h6" />
                            </svg>
                            <p className="text-gray-400 text-sm">{t.playerEntry.noPlayers}</p>
                        </div>
                    ) : (
                        <div className="space-y-2 pr-2">
                            {players.map((player) => (
                                <div
                                    key={player.id}
                                    className="flex items-center justify-between bg-slate-600/50 hover:bg-slate-600 rounded-lg p-3 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-7 h-7 flex items-center justify-center bg-slate-500 rounded flex-shrink-0">
                                            <span className="text-white font-bold text-xs">{player.startNumber}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-white font-medium text-sm truncate">
                                                {player.title && <span className="text-yellow-400 mr-1">{player.title}</span>}
                                                {player.surname} {player.name?.charAt(0) || ''}.
                                            </div>
                                            <div className="text-xs text-gray-400 flex gap-2 flex-wrap">
                                                {[
                                                    player.rating > 0 && { key: 'rating', label: player.rating.toString() },
                                                    player.federation && { key: 'federation', label: `• ${player.federation}` },
                                                    player.club && { key: 'club', label: `• ${player.club}` },
                                                    player.sex !== '-' && { key: 'sex', label: `• ${player.sex === 'M' ? t.playerEntry.male : t.playerEntry.female}` }
                                                ].filter((item): item is { key: string; label: string } => item !== false).map(item => (
                                                    <span key={item.key}>{item.label}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 ml-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(player)}
                                            className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white"
                                            title={t.playerEntry.edit}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onPlayerDeleted(player.id)}
                                            className="p-1.5 bg-red-600 hover:bg-red-700 rounded text-white"
                                            title={t.playerEntry.delete}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dugmići za akcije */}
                <div className="flex justify-center gap-3 pt-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-xs font-medium flex items-center gap-1.5"
                        title={t.playerEntry.importBtn}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {t.playerEntry.importBtn}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt"
                        onChange={handleImport}
                        className="hidden"
                    />

                    <button
                        onClick={handleExport}
                        disabled={players.length === 0}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white text-xs font-medium flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t.playerEntry.exportBtn}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t.playerEntry.exportBtn}
                    </button>

                    <button
                        onClick={() => setShowHelp(true)}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-xs font-medium flex items-center gap-1.5"
                        title={t.playerEntry.helpBtn}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t.playerEntry.helpBtn}
                    </button>
                </div>

                {/* Dugme za navigaciju na Raspored */}
                {players.length > 0 && onNavigateToSchedule && (
                    <div className="pt-4 mt-4 border-t border-slate-700/50">
                        <div className="text-center mb-3">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-slate-300 text-sm font-medium">{t.playerEntry.readyForSchedule}</span>
                            </div>
                            <p className="text-slate-400 text-xs mb-4 max-w-sm mx-auto">
                                {t.playerEntry.scheduleHint}
                            </p>
                        </div>
                        <button
                            onClick={onNavigateToSchedule}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow flex items-center justify-center gap-2 text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                            </svg>
                            {t.playerEntry.navigateToSchedule}
                        </button>
                    </div>
                )}
            </div>

            {/* Help Modal */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
                    <div className="bg-slate-800 rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto border-2 border-cyan-500" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between z-10">
                            <h3 className="text-lg font-bold text-white">{t.playerEntry.helpTitle}</h3>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Import Help */}
                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="flex items-start gap-2 mb-2">
                                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-1">{t.playerEntry.helpImport}</h4>
                                        <p className="text-xs text-gray-300 mb-2">{t.playerEntry.helpImportDesc}</p>
                                        <div className="bg-slate-800 p-2 rounded text-[10px] text-cyan-400 font-mono break-all mb-1">
                                            {t.playerEntry.helpImportFormat}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono break-all">
                                            {t.playerEntry.helpImportExample}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Export Help */}
                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-1">{t.playerEntry.helpExport}</h4>
                                        <p className="text-xs text-gray-300">{t.playerEntry.helpExportDesc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Add Help */}
                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-1">{t.playerEntry.helpAdd}</h4>
                                        <p className="text-xs text-gray-300">{t.playerEntry.helpAddDesc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Help */}
                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-1">{t.playerEntry.helpEdit}</h4>
                                        <p className="text-xs text-gray-300">{t.playerEntry.helpEditDesc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Help */}
                            <div className="bg-slate-700 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white mb-1">{t.playerEntry.helpDelete}</h4>
                                        <p className="text-xs text-gray-300">{t.playerEntry.helpDeleteDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-4 z-10">
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                {t.playerEntry.helpClose}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}