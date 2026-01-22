// components/Standings.tsx
'use client';

import { Standing, Player } from '@/lib/types';
import { translations, Language } from '@/lib/i18n';

interface StandingsProps {
    standings: Standing[];
    players?: Player[];
    language: Language;
}

export default function Standings({ standings, players = [], language }: StandingsProps) {
    const t = translations[language];

    if (standings.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.standings.title}</h2>
                <p className="text-gray-400 text-center py-8">{t.standings.noStandings}</p>
            </div>
        );
    }

    // Kreiraj mapu igrača za brže pronalaženje
    const playerMap = new Map();
    if (players && players.length > 0) {
        players.forEach(player => {
            playerMap.set(player.id, player);
        });
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.standings.title}</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[10px] sm:text-xs">
                    <thead>
                    <tr className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">{t.standings.position}</th>
                        <th className="px-2 py-2 text-left font-bold border-r border-cyan-400">{t.standings.name}</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400 bg-yellow-500">{t.standings.points}</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">{t.standings.sonneborn}</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">DE</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">{t.standings.wins}</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">{t.standings.draws}</th>
                        <th className="px-1.5 py-2 text-center font-bold border-r border-cyan-400">{t.standings.losses}</th>
                        <th className="px-1.5 py-2 text-center font-bold">{t.standings.whitePoints}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {standings.map((standing, index) => {
                        const bgColor = index === 0
                            ? 'bg-yellow-100'
                            : index === 1
                                ? 'bg-blue-100'
                                : index === 2
                                    ? 'bg-orange-100'
                                    : index % 2 === 0
                                        ? 'bg-gray-50'
                                        : 'bg-white';

                        const medal = index === 0 ? t.standings.medals.gold :
                            index === 1 ? t.standings.medals.silver :
                                index === 2 ? t.standings.medals.bronze : '';

                        // Pronađi igrača iz mape
                        const player = playerMap.get(standing.playerId);
                        const playerRating = player?.rating || '';

                        // DE (Direct Encounter)
                        const deValue = standing.directEncounter || 0;

                        return (
                            <tr key={standing.playerId} className={`${bgColor} border-b border-gray-200`}>
                                <td className="px-1.5 py-2 text-center font-bold text-gray-800">
                                    {standing.position || index + 1}
                                    {medal}
                                </td>
                                <td className="px-2 py-2 text-gray-800">
                                    {standing.playerTitle && (
                                        <span className="text-yellow-600 mr-0.5 font-bold">{standing.playerTitle}</span>
                                    )}
                                    {standing.playerName.split(' ')[0]} {standing.playerName.split(' ').slice(1).join(' ').charAt(0)}.
                                    {playerRating && (
                                        <span className="text-gray-600 text-[9px]"> ({playerRating})</span>
                                    )}
                                </td>
                                <td className="px-1.5 py-2 text-center font-bold text-yellow-700 bg-yellow-200">
                                    {standing.points.toFixed(1)}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700">
                                    {standing.sonneborn.toFixed(1)}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700">
                                    {deValue.toFixed(1)}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700 font-medium">
                                    {standing.wins}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700 font-medium">
                                    {standing.draws}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700 font-medium">
                                    {standing.losses}
                                </td>
                                <td className="px-1.5 py-2 text-center text-gray-700">
                                    {standing.whitePoints.toFixed(1)}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}