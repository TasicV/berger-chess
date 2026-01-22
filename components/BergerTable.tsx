'use client';

import React from 'react';
import { translations, Language } from '@/lib/i18n';
import { Player, Round, Standing } from '@/lib/types';

interface BergerTableProps {
    players: Player[];
    rounds: Round[];
    standings: Standing[];
    results: Record<string, string>;
    language: Language;
    isDoubleRoundRobin: boolean;
}

const BergerTable = ({ players, rounds, standings, results, language, isDoubleRoundRobin }: BergerTableProps) => {
    const t = translations[language];

    // Sortiraj igrače po startnom broju
    const sortedPlayers = [...players].sort((a, b) => (a.startNumber || 0) - (b.startNumber || 0));

    // Kreiraj mapu igrača
    const playerMap = new Map();
    players.forEach(player => {
        playerMap.set(player.id, player);
    });

    // Funkcija za prikaz rezultata
    const displayResult = (result: string, isWhite: boolean) => {
        if (!result) return '-';
        if (result === 'X') return <span className="font-bold text-cyan-500 bg-gray-100 px-1 py-0.5 rounded">X</span>;
        if (result === 'BYE') return <span className="text-green-600 font-bold bg-green-100 px-1 py-0.5 rounded">+</span>;

        // Boje: Crveni za belog, Plavi za crnog
        const whiteColor = 'text-red-600'; // Crveni
        const blackColor = 'text-blue-600'; // Plavi

        if (result.includes('|')) {
            const [firstGame, secondGame] = result.split('|');

            // Prvi red: kao beli (crveni bold)
            let firstResult = firstGame === '1-0' ? '1' :
                firstGame === '0-1' ? '0' :
                    firstGame === '½-½' ? '½' : firstGame;

            // Drugi red: kao crni (plavi normal)
            let secondResult = secondGame === '1-0' ? '1' :
                secondGame === '0-1' ? '0' :
                    secondGame === '½-½' ? '½' : secondGame;

            return (
                <div className="flex flex-col space-y-0">
                    <div className={`${isWhite ? 'font-bold' : 'font-normal'} ${isWhite ? whiteColor : blackColor} px-1 py-0.5 rounded mb-0.5`}>
                        {firstResult}
                    </div>
                    <div className={`${!isWhite ? 'font-bold' : 'font-normal'} ${!isWhite ? whiteColor : blackColor} px-1 py-0.5 rounded`}>
                        {secondResult}
                    </div>
                </div>
            );
        }

        let displayResult = result === '1-0' ? '1' :
            result === '0-1' ? '0' :
                result === '½-½' ? '½' : result;

        return (
            <div className={`${isWhite ? 'font-bold' : 'font-normal'} ${isWhite ? whiteColor : blackColor} px-1 py-0.5 rounded`}>
                {displayResult}
            </div>
        );
    };

    // Pronađi rezultat meča - sa BYE informacijama i DUPLI REZULTAT ZA DVOKRUŽNI SISTEM
    const getMatchResultForCell = (rowPlayerId: string, colPlayerId: string) => {
        // Ako je isti igrač (dijagonala) - X
        if (rowPlayerId === colPlayerId) {
            return { result: 'X', isWhite: false };
        }

        // Proveri da li je protiv BYE
        if (colPlayerId.startsWith('BYE')) {
            for (const round of rounds || []) {
                const byeMatch = round.matches.find(m =>
                    (m.whitePlayerId === rowPlayerId && m.blackPlayerId === colPlayerId) ||
                    (m.whitePlayerId === colPlayerId && m.blackPlayerId === rowPlayerId)
                );

                if (byeMatch) {
                    return {
                        result: 'BYE',
                        isWhite: true,
                        roundNumber: round.roundNumber
                    };
                }
            }
            return { result: 'BYE', isWhite: true, roundNumber: null };
        }

        if (rowPlayerId.startsWith('BYE')) {
            return { result: 'X', isWhite: false };
        }

        // Pronađi meč između dva igrača
        let firstResult = null;
        let firstRound = null;
        let isWhiteInFirst = false;

        for (const round of rounds || []) {
            const matchAsWhite = round.matches.find(m =>
                m.whitePlayerId === rowPlayerId && m.blackPlayerId === colPlayerId
            );

            if (matchAsWhite) {
                const resultKey = `${round.roundNumber}-${rowPlayerId}-${colPlayerId}`;
                const result = results[resultKey];
                firstResult = result;
                firstRound = round.roundNumber;
                isWhiteInFirst = true;
                break;
            }

            const matchAsBlack = round.matches.find(m =>
                m.whitePlayerId === colPlayerId && m.blackPlayerId === rowPlayerId
            );

            if (matchAsBlack) {
                const resultKey = `${round.roundNumber}-${colPlayerId}-${rowPlayerId}`;
                const result = results[resultKey];
                let reversedResult = result;
                if (result === '1-0') reversedResult = '0-1';
                else if (result === '0-1') reversedResult = '1-0';
                firstResult = reversedResult;
                firstRound = round.roundNumber;
                isWhiteInFirst = false;
                break;
            }
        }

        if (!firstResult) {
            return { result: null, isWhite: false };
        }

        // AKO JE DVOKRUŽNI SISTEM - PRONAĐI DRUGI REZULTAT
        if (isDoubleRoundRobin) {
            const totalRounds = rounds.length;
            const firstHalfRounds = Math.ceil(totalRounds / 2);
            const secondRound = firstRound! + firstHalfRounds;

            for (const round of rounds || []) {
                if (round.roundNumber === secondRound) {
                    // U drugoj rundi, boje su obrnute
                    const matchAsBlack = round.matches.find(m =>
                        m.whitePlayerId === rowPlayerId && m.blackPlayerId === colPlayerId
                    );

                    if (matchAsBlack) {
                        const resultKey = `${round.roundNumber}-${rowPlayerId}-${colPlayerId}`;
                        const result = results[resultKey];
                        const combinedResult = `${firstResult}|${result}`;
                        return { result: combinedResult, isWhite: isWhiteInFirst };
                    }

                    const matchAsWhite = round.matches.find(m =>
                        m.whitePlayerId === colPlayerId && m.blackPlayerId === rowPlayerId
                    );

                    if (matchAsWhite) {
                        const resultKey = `${round.roundNumber}-${colPlayerId}-${rowPlayerId}`;
                        const result = results[resultKey];
                        let reversedResult = result;
                        if (result === '1-0') reversedResult = '0-1';
                        else if (result === '0-1') reversedResult = '1-0';
                        const combinedResult = `${firstResult}|${reversedResult}`;
                        return { result: combinedResult, isWhite: isWhiteInFirst };
                    }
                }
            }
        }

        return { result: firstResult, isWhite: isWhiteInFirst };
    };

    return (
        <div className="bg-white rounded-xl p-4 border-2 border-gray-300 shadow-xl mt-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{t.bergerTable.title}</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300 max-w-full berger-table-font">
                <table className="border-collapse bg-white w-full text-xs sm:text-sm">
                    <thead>
                    <tr className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
                        <th className="px-2 py-2 text-center font-bold min-w-[40px] border-r border-cyan-400">{t.bergerTable.position}</th>
                        <th className="px-3 py-2 text-left font-bold border-r border-cyan-400">
                            {t.bergerTable.player}
                        </th>

                        {sortedPlayers.map(player => (
                            <th key={`col-${player.id}`} className="px-2 py-2 border-l border-cyan-400 text-center font-bold min-w-[45px]">
                                {player.startNumber || ''}
                            </th>
                        ))}

                        <th className="px-2 py-2 border-l border-cyan-400 text-center font-bold bg-yellow-500 text-white min-w-[50px]">{t.bergerTable.points}</th>
                        <th className="px-2 py-2 border-l border-cyan-400 text-center font-bold min-w-[45px]">{t.bergerTable.sonneborn}</th>
                        <th className="px-2 py-2 border-l border-cyan-400 text-center font-bold min-w-[45px]">DE</th>
                        <th className="px-2 py-2 border-l border-cyan-400 text-center font-bold min-w-[45px]">{t.bergerTable.wins}</th>
                        <th className="px-2 py-2 text-center font-bold min-w-[45px]">{t.bergerTable.whitePoints}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedPlayers.map((player, rowIndex) => {
                        const playerPosition = standings?.findIndex(s => s.playerId === player.id) + 1 || rowIndex + 1;
                        const playerStanding = standings?.find(s => s.playerId === player.id);
                        const points = playerStanding?.points?.toFixed(1) || '0.0';
                        const sb = playerStanding?.sonneborn?.toFixed(1) || '0.0';
                        const de = playerStanding?.directEncounter?.toFixed(1) || '0.0';
                        const whitePoints = playerStanding?.whitePoints?.toFixed(1) || '0.0';
                        const wins = playerStanding?.wins || 0;

                        const bgColor = playerPosition === 1
                            ? 'bg-yellow-100'
                            : playerPosition === 2
                                ? 'bg-blue-100'
                                : playerPosition === 3
                                    ? 'bg-orange-100'
                                    : rowIndex % 2 === 0
                                        ? 'bg-gray-50'
                                        : 'bg-white';

                        const medal = playerPosition === 1 ? t.standings.medals.gold :
                            playerPosition === 2 ? t.standings.medals.silver :
                                playerPosition === 3 ? t.standings.medals.bronze : '';

                        const playerRating = player.rating || '';

                        return (
                            <tr key={player.id} className={`${bgColor} border-b border-gray-200`}>
                                <td className="px-2 py-2 text-center text-gray-800 font-bold border-r border-gray-300">
                                    {playerPosition}
                                    {medal}
                                </td>

                                {/* IME IGRAČA SA TITULOM I REJTINGOM U ZAGRADI */}
                                <td className="px-3 py-2 text-gray-800 whitespace-nowrap border-r border-gray-300">
                                    {player.title && (
                                        <span className="text-yellow-600 mr-1 font-bold">{player.title}</span>
                                    )}
                                    {player.surname} {player.name?.charAt(0) || ''}.
                                    {playerRating && (
                                        <span className="text-gray-600 text-[9px]"> ({playerRating})</span>
                                    )}
                                </td>

                                {sortedPlayers.map((opponent, colIndex) => {
                                    if (player.id === opponent.id) {
                                        return (
                                            <td key={`cell-${player.id}-${opponent.id}`} className="px-2 py-2 border-l border-gray-300 text-center">
                                                <div className="font-bold text-cyan-500 bg-gray-100 px-1 py-0.5 rounded mx-auto w-6 h-6 flex items-center justify-center text-sm">
                                                    X
                                                </div>
                                            </td>
                                        );
                                    }

                                    const matchResult = getMatchResultForCell(player.id, opponent.id);

                                    if (!matchResult.result) {
                                        return (
                                            <td key={`cell-${player.id}-${opponent.id}`} className="px-2 py-2 border-l border-gray-300 text-center">
                                                <div className="text-gray-400 text-sm">-</div>
                                            </td>
                                        );
                                    }

                                    // Poseban prikaz za BYE sa brojem kola
                                    if (matchResult.result === 'BYE') {
                                        return (
                                            <td key={`cell-${player.id}-${opponent.id}`} className="px-2 py-2 border-l border-gray-300 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-green-600 font-bold bg-green-100 px-1 py-0.5 rounded text-sm">
                                                        +
                                                    </div>
                                                    {matchResult.roundNumber && (
                                                        <div className="text-[9px] text-green-700 mt-0.5">
                                                            {matchResult.roundNumber}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        );
                                    }

                                    return (
                                        <td key={`cell-${player.id}-${opponent.id}`} className="px-2 py-2 border-l border-gray-300 text-center">
                                            <div className="flex justify-center">
                                                {displayResult(matchResult.result, matchResult.isWhite)}
                                            </div>
                                        </td>
                                    );
                                })}

                                <td className="px-2 py-2 border-l border-gray-300 text-center text-yellow-700 font-bold bg-yellow-200">
                                    {points}
                                </td>
                                <td className="px-2 py-2 border-l border-gray-300 text-center text-gray-700">
                                    {sb}
                                </td>
                                <td className="px-2 py-2 border-l border-gray-300 text-center text-gray-700">
                                    {de}
                                </td>
                                <td className="px-2 py-2 border-l border-gray-300 text-center text-gray-700 font-medium">
                                    {wins}
                                </td>
                                <td className="px-2 py-2 text-center text-gray-700">
                                    {whitePoints}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BergerTable;