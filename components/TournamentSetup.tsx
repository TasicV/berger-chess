// components/TournamentSetup.tsx
'use client';

import { useState, useEffect } from 'react'; // DODAJ useEffect
import { translations, Language } from '@/lib/i18n';
import { Player } from '@/lib/types';

interface TournamentSetupProps {
    onTournamentCreated: (tournamentData: TournamentData) => void;
    language: Language;
    initialData?: TournamentData; // DODAJ OVO
    isEditing?: boolean; // DODAJ OVO
}

export interface TournamentData {
    name: string;
    city: string;
    organizer: string;
    startDate: string;
    endDate: string;
    timeControl: string;
    doubleRoundRobin: boolean;
    players?: Player[];
}

export default function TournamentSetup({
                                            onTournamentCreated,
                                            language,
                                            initialData,
                                            isEditing = false // DODAJ OVO
                                        }: TournamentSetupProps) {
    const t = translations[language];

    const [formData, setFormData] = useState<TournamentData>({
        name: '',
        city: '',
        organizer: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        timeControl: '',
        doubleRoundRobin: false
    });

    // DODAJ OVAJ useEffect DA POPUNI FORMU SA EXISTING PODACIMA
    useEffect(() => {
        if (initialData && isEditing) {
            setFormData({
                name: initialData.name,
                city: initialData.city,
                organizer: initialData.organizer,
                startDate: initialData.startDate,
                endDate: initialData.endDate,
                timeControl: initialData.timeControl,
                doubleRoundRobin: initialData.doubleRoundRobin
            });
        }
    }, [initialData, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTournamentCreated(formData);
    };

    return (
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
            {/* PROMENI NASLOV ZAVISNO DA LI JE EDIT ILI CREATE */}
            <h2 className="text-2xl font-bold text-white mb-6">
                {isEditing ? t.tournamentSetup.editTitle : t.tournamentSetup.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tournament Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.tournamentSetup.tournamentName} <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder={t.tournamentSetup.placeholders.tournamentName}
                    />
                </div>

                {/* City and Organizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.tournamentSetup.city} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder={t.tournamentSetup.placeholders.city}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.common.organizer}
                        </label>
                        <input
                            type="text"
                            value={formData.organizer}
                            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder={t.tournamentSetup.placeholders.organizer}
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.tournamentSetup.startDate} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.tournamentSetup.endDate}
                        </label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>

                {/* Time Control */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.tournamentSetup.timeControl}
                    </label>
                    <input
                        type="text"
                        value={formData.timeControl}
                        onChange={(e) => setFormData({ ...formData, timeControl: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder={t.tournamentSetup.placeholders.timeControl}
                    />
                </div>

                {/* Double Round Robin */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="doubleRoundRobin"
                        checked={formData.doubleRoundRobin}
                        onChange={(e) => setFormData({ ...formData, doubleRoundRobin: e.target.checked })}
                        className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                    />
                    <label htmlFor="doubleRoundRobin" className="text-gray-300 text-sm">
                        <span className="font-medium">{t.tournamentSetup.doubleRoundRobin}</span>
                        <span className="block text-xs text-gray-400 mt-1">{t.tournamentSetup.doubleRoundRobinDesc}</span>
                    </label>
                </div>

                {/* Tiebreak Criteria Info */}
                <div className="bg-slate-600 rounded-lg p-4 border border-slate-500">
                    <h4 className="text-sm font-semibold text-white mb-2">{t.tournamentSetup.criteriaTitle}</h4>
                    <p className="text-xs text-gray-300 mb-3">{t.tournamentSetup.criteriaMain}</p>
                    <p className="text-xs font-medium text-cyan-400 mb-2">{t.tournamentSetup.criteriaSubtitle}</p>
                    <ol className="space-y-2 text-xs text-gray-300 pl-4">
                        <li className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold flex-shrink-0">1.</span>
                            <span className="font-medium">{t.tournamentSetup.criteria1}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold flex-shrink-0">2.</span>
                            <span className="font-medium">{t.tournamentSetup.criteria2}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold flex-shrink-0">3.</span>
                            <span className="font-medium">{t.tournamentSetup.criteria3}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold flex-shrink-0">4.</span>
                            <span className="font-medium">{t.tournamentSetup.criteria4}</span>
                        </li>
                    </ol>
                </div>

                {/* Legend za obavezna polja */}
                <div className="text-xs text-gray-400 pt-2 border-t border-slate-700">
                    <span className="text-red-400">*</span> {t.common.required}
                </div>

                {/* PROMENI TEKST DUGMETA ZAVISNO DA LI JE EDIT ILI CREATE */}
                <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    {isEditing ? t.tournamentSetup.updateButton : t.tournamentSetup.createButton}
                </button>
            </form>
        </div>
    );
}