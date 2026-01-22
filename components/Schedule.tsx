'use client';

import { Round, Match } from '@/lib/types';
import { translations, Language } from '@/lib/i18n';

interface ScheduleProps {
    rounds: Round[];
    results: Record<string, string>;
    onResultChange: (roundNumber: number, whiteId: string, blackId: string, result: string) => void;
    onFinish?: () => void;
    isDoubleRoundRobin: boolean;
    language: Language;
}

const displayPlayerName = (player: any): string => {
    const nameInitial = player.name && player.name.trim() ? player.name.charAt(0) : '';
    return `${player.surname}${nameInitial ? ` ${nameInitial}.` : ''}`;
};

export default function Schedule({ rounds, results, onResultChange, onFinish, isDoubleRoundRobin, language }: ScheduleProps) {
    const t = translations[language];
    const singleGameOptions = ['1-0', '½-½', '0-1'];

    if (rounds.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">{t.schedule.title}</h2>
                <p className="text-gray-400 text-center py-8">
                    {t.schedule.noSchedule}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
            {/* Header - samo naslov */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{t.schedule.title}</h2>
            </div>

            <div className="space-y-6">
                {rounds.map((round) => {
                    // Broj BYE mečeva u ovom kolu
                    const byeMatches = round.matches.filter(match =>
                        match.whitePlayerId === 'BYE' || match.blackPlayerId === 'BYE'
                    );

                    // Broj normalnih mečeva
                    const normalMatches = round.matches.filter(match =>
                        match.whitePlayerId !== 'BYE' && match.blackPlayerId !== 'BYE'
                    );

                    return (
                        <div key={round.roundNumber} className="bg-slate-700 rounded-lg overflow-hidden">
                            {/* Round Header */}
                            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                                <h3 className="text-white font-bold text-lg">
                                    {t.schedule.round} {round.roundNumber}
                                </h3>
                            </div>

                            {/* Matches Container */}
                            <div className="p-4 space-y-3">
                                {/* Prvo prikaži BYE mečeve kao Tabla 1 */}
                                {byeMatches.map((match, idx) => {
                                    // Pronađi pravog igrača (onaj koji nije BYE)
                                    const playerName = match.whitePlayerId === 'BYE' ? match.blackPlayerName : match.whitePlayerName;
                                    const playerRating = (match.whitePlayerId === 'BYE' ? match.blackRating : match.whiteRating) ?? 0;

                                    return (
                                        <div
                                            key={`bye-${idx}`}
                                            className="bg-slate-600 rounded-lg p-3 hover:bg-slate-500 transition-colors"
                                        >
                                            <div className="grid grid-cols-[20px_1fr_68px] gap-1.5 items-center">
                                                {/* Broj table - uvek 1 za BYE */}
                                                <div className="text-cyan-400 font-bold text-xs text-center">
                                                    1
                                                </div>

                                                {/* Igrač sa BYE-om - BEZ OZNAKE BELE/CRNE */}
                                                <div className="space-y-0.5 overflow-visible">
                                                    <div className="flex items-center gap-1 text-white text-[11px] leading-tight">
                                                        <span className="text-sm flex-shrink-0">👤</span>
                                                        <span className="font-medium whitespace-nowrap">
                                                            {playerName}
                                                        </span>
                                                        {playerRating > 0 && (
                                                            <span className="text-gray-400 text-[9px] flex-shrink-0">
                                                                ({playerRating})
                                                            </span>
                                                        )}
                                                        <span className="text-cyan-300 text-[10px] ml-2 font-medium">
                                                            {t.common.bye}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Onda prikaži normalne mečeve */}
                                {normalMatches.map((match, idx) => {
                                    const resultKey = `${round.roundNumber}-${match.whitePlayerId}-${match.blackPlayerId}`;
                                    const currentResult = results[resultKey] || '';

                                    // Broj table: ako ima BYE mečeva, počni od 2, inače od 1
                                    const tableNumber = byeMatches.length > 0 ? idx + 2 : idx + 1;

                                    return (
                                        <div
                                            key={`normal-${idx}`}
                                            className="bg-slate-600 rounded-lg p-3 hover:bg-slate-500 transition-colors"
                                        >
                                            <div className="grid grid-cols-[20px_1fr_68px] gap-1.5 items-center">
                                                <div className="text-cyan-400 font-bold text-xs text-center">
                                                    {tableNumber}
                                                </div>
                                                <div className="space-y-0.5 overflow-visible">
                                                    {/* BELA - Mali beli kvadratić ispred imena */}
                                                    <div className="flex items-center gap-1.5 text-white text-[11px] leading-tight font-bold">
                                                        <span className="inline-block w-3 h-3 bg-white border border-gray-300 flex-shrink-0"></span>
                                                        <span className="font-bold whitespace-nowrap">{match.whitePlayerName}</span>
                                                        {(match.whiteRating ?? 0) > 0 && (
                                                            <span className="text-gray-400 text-[9px] flex-shrink-0">({match.whiteRating})</span>
                                                        )}
                                                    </div>
                                                    {/* CRNA - Mali crni kvadratić ispred imena */}
                                                    <div className="flex items-center gap-1.5 text-slate-300 text-[11px] leading-tight font-normal">
                                                        <span className="inline-block w-3 h-3 bg-gray-800 border border-gray-600 flex-shrink-0"></span>
                                                        <span className="font-normal whitespace-nowrap">{match.blackPlayerName}</span>
                                                        {(match.blackRating ?? 0) > 0 && (
                                                            <span className="text-gray-400 text-[9px] flex-shrink-0">({match.blackRating})</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <select
                                                    value={currentResult}
                                                    onChange={(e) => {
                                                        onResultChange(round.roundNumber, match.whitePlayerId, match.blackPlayerId, e.target.value);
                                                    }}
                                                    className="px-0.5 py-1 bg-slate-700 border border-slate-500 rounded text-white text-[10px] font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 w-full"
                                                >
                                                    <option value="">{t.schedule.placeholders.selectResult}</option>
                                                    {singleGameOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* FINISH Dugme */}
            {onFinish && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onFinish}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        FINISH
                    </button>
                </div>
            )}
        </div>
    );
}