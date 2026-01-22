"use client";

import { useState, useEffect } from 'react';
import TournamentSetup from '@/components/TournamentSetup';
import { TournamentData } from '@/components/TournamentSetup';
import PlayerEntry from '@/components/PlayerEntry';
import Schedule from '@/components/Schedule';
import Standings from '@/components/Standings';
import BergerTable from '@/components/BergerTable';
import { Tournament, Player, Round, Standing } from '@/lib/types';
import { generateSchedule, calculateStandings } from '@/lib/berger';
import { translations, Language } from '@/lib/i18n';

export default function GermanAppPage() {
    const [tournament, setTournament] = useState<TournamentData | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [standings, setStandings] = useState<Standing[]>([]);
    const [results, setResults] = useState<Record<string, string>>({});
    const [language, setLanguage] = useState<Language>('de');
    const [activeTab, setActiveTab] = useState<'players' | 'schedule' | 'standings'>('players');
    const [isEditingTournament, setIsEditingTournament] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('berger-language') as Language | null;
        if (savedLang && ['sr', 'en', 'de', 'ru'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const t = translations[language];

    useEffect(() => {
        if (players.length > 0) {
            const newRounds = generateSchedule(players, tournament?.doubleRoundRobin || false);
            setRounds(newRounds);
        } else {
            setRounds([]);
        }
    }, [players, tournament?.doubleRoundRobin]);

    useEffect(() => {
        if (players.length > 0 && rounds.length > 0) {
            const newStandings = calculateStandings(players, rounds, results);
            setStandings(newStandings);
        } else {
            setStandings([]);
        }
    }, [players, rounds, results, tournament?.doubleRoundRobin]);

    const handleTournamentCreated = (newTournament: TournamentData) => {
        setTournament(newTournament);
        setIsEditingTournament(false);
    };

    const handlePlayerAdded = (player: Player) => {
        setPlayers([...players, player]);
    };

    const handlePlayerUpdated = (playerId: string, updatedPlayer: Player) => {
        setPlayers(players.map(p => p.id === playerId ? updatedPlayer : p));
    };

    const handlePlayerDeleted = (playerId: string) => {
        setPlayers(players.filter(p => p.id !== playerId));
    };

    const handlePlayersImported = (importedPlayers: Player[]) => {
        setPlayers([...players, ...importedPlayers]);
    };

    const handleResultChange = (roundNumber: number, whiteId: string, blackId: string, result: string) => {
        const resultKey = `${roundNumber}-${whiteId}-${blackId}`;
        setResults(prev => ({
            ...prev,
            [resultKey]: result
        }));
    };

    const handleEditTournament = () => {
        setIsEditingTournament(true);
    };

    const handleCancelEditTournament = () => {
        setIsEditingTournament(false);
    };

    const handleDeleteTournament = () => {
        if (confirm(t.messages.confirmations.deleteTournament)) {
            setTournament(null);
            setPlayers([]);
            setRounds([]);
            setStandings([]);
            setResults({});
            setIsEditingTournament(false);
        }
    };

    const handleNewTournament = () => {
        if (confirm(t.messages.confirmations.newTournament)) {
            setTournament(null);
            setPlayers([]);
            setRounds([]);
            setStandings([]);
            setResults({});
            setIsEditingTournament(false);
        }
    };

    const handleExportAll = () => {
        if (players.length === 0 || standings.length === 0) {
            alert(t.messages.errors.noData);
            return;
        }

        const tournamentName = tournament?.name || t.export.defaultTournamentName;
        const city = tournament?.city || '';
        const date = tournament?.startDate || new Date().toISOString().split('T')[0];
        const organizer = tournament?.organizer || '';
        const isDouble = tournament?.doubleRoundRobin || false;
        const currentDate = new Date().toLocaleDateString();
        const totalPlayers = players.length;
        const totalRounds = rounds.length;

        const getPlayerName = (player: Player) => {
            const nameInitial = player.name && player.name.trim() ? player.name.charAt(0) : '';
            if (player.title) {
                return `<strong class="player-title">${player.title}</strong> ${player.surname}${nameInitial ? ` ${nameInitial}.` : ''}`;
            }
            return `${player.surname}${nameInitial ? ` ${nameInitial}.` : ''}`;
        };

        const getPlayerShortName = (player: Player) => {
            const nameInitial = player.name && player.name.trim() ? player.name.charAt(0) : '';
            const playerTitle = player.title ? `<strong class="player-title">${player.title}</strong> ` : '';
            const baseName = `${player.surname}${nameInitial ? ` ${nameInitial}.` : ''}`;
            const rating = player.rating ? ` <span style="color: #64748b; font-size: 11px;">(${player.rating})</span>` : '';
            return playerTitle + baseName + rating;
        };

        const getCompleteResultsTable = () => {
            let resultsHTML = `
        <div class="section-title">${t.export.completeResults}</div>
        <div style="margin-bottom: 30px;">
    `;

            rounds.forEach(round => {
                resultsHTML += `
            <div style="margin-bottom: 25px; background-color: #f8fafc; border-radius: 6px; padding: 15px; border: 1px solid #e2e8f0;">
                <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #0ea5e9;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin: 0;">
                        ${t.common.round} ${round.roundNumber}
                    </h3>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                        <tr style="background-color: #e2e8f0;">
                            <th style="padding: 8px; text-align: center; width: 50px;">${t.export.headers.table}</th>
                            <th style="padding: 8px; text-align: left;">${t.common.game}</th>
                            <th style="padding: 8px; text-align: center; width: 80px;">${t.export.result}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

                const displayMatches = round.matches.filter(match =>
                    !(match.whitePlayerId === 'BYE' && match.blackPlayerId === 'BYE')
                );

                displayMatches.forEach((match, idx) => {
                    const isByeMatch = match.whitePlayerId === 'BYE' || match.blackPlayerId === 'BYE';
                    const resultKey = `${round.roundNumber}-${match.whitePlayerId}-${match.blackPlayerId}`;
                    const result = results[resultKey];

                    const whitePlayerName = match.whitePlayerName;
                    const blackPlayerName = match.blackPlayerName;
                    const whiteRating = match.whiteRating || 0;
                    const blackRating = match.blackRating || 0;

                    const isPlayerWhite = match.whitePlayerId !== 'BYE';

                    if (isByeMatch) {
                        // Pronađi koji je igrač pravi (ne BYE)
                        const isRealPlayerWhite = match.whitePlayerId !== 'BYE';
                        const realPlayer = isRealPlayerWhite ? match.whitePlayerName : match.blackPlayerName;
                        const realPlayerRating = isRealPlayerWhite ? match.whiteRating : match.blackRating;

                        resultsHTML += `
                    <tr style="${idx % 2 === 0 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;'}">
                        <td style="padding: 8px; text-align: center; color: #475569; font-weight: 600; vertical-align: middle;" rowspan="2">
                            ${idx + 1}
                        </td>
                        <td style="padding: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: #0f172a; font-weight: 600;">-</span>
                                <span style="color: #0f172a;">${realPlayer}</span>
                                ${realPlayerRating && realPlayerRating > 0 ? `<span style="color: #64748b; font-size: 11px;">(${realPlayerRating})</span>` : ''}
                                <span style="margin-left: auto; font-size: 10px; color: #94a3b8; background-color: #e2e8f0; padding: 1px 6px; border-radius: 10px;">${t.common.white}</span>
                            </div>
                        </td>
                        <td style="padding: 8px; text-align: center; vertical-align: middle; background-color: #f0fdf4; color: #166534; font-weight: bold;">${t.common.bye}</td>
                    </tr>
                    
                    <tr style="${idx % 2 === 0 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;'}">
                        <td style="padding: 8px; border-top: none;">
                            <div style="color: #64748b; font-style: italic; font-size: 12px; padding-left: 8px; background-color: #f0fdf4; padding: 4px 8px; border-radius: 4px;">
                                ${t.common.bye}
                            </div>
                        </td>
                        <td style="padding: 8px; text-align: center; vertical-align: middle; background-color: #f0fdf4; color: #166534; font-weight: bold;"><span style="font-size: 10px; color: #999;">(${t.common.free})</span></td>
                    </tr>
                `;
                        return;
                    }

                    let displayResult = result || t.export.placeholders.noResult;

                    // Inicijalizuj boje PRE korišćenja
                    let resultColor = '#64748b';
                    let resultBgColor = '#f1f5f9';

                    if (result) {
                        if (result === '1-0') {
                            resultColor = '#059669';
                            resultBgColor = '#d1fae5';
                        } else if (result === '0-1') {
                            resultColor = '#dc2626';
                            resultBgColor = '#fee2e2';
                        } else if (result === '½-½') {
                            resultColor = '#ca8a04';
                            resultBgColor = '#fef3c7';
                        }
                    }

                    // Dupli rezultat za dvokružni sistem
                    let displayResultHTML = displayResult;
                    if (result && result.includes('|')) {
                        const [firstResult, secondResult] = result.split('|');
                        let firstColor = '#64748b', firstBg = '#f1f5f9';
                        let secondColor = '#64748b', secondBg = '#f1f5f9';

                        if (firstResult === '1-0') { firstColor = '#059669'; firstBg = '#d1fae5'; }
                        else if (firstResult === '0-1') { firstColor = '#dc2626'; firstBg = '#fee2e2'; }
                        else if (firstResult === '½-½') { firstColor = '#ca8a04'; firstBg = '#fef3c7'; }

                        if (secondResult === '1-0') { secondColor = '#059669'; secondBg = '#d1fae5'; }
                        else if (secondResult === '0-1') { secondColor = '#dc2626'; secondBg = '#fee2e2'; }
                        else if (secondResult === '½-½') { secondColor = '#ca8a04'; secondBg = '#fef3c7'; }

                        displayResultHTML = `
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <span style="background-color: ${firstBg}; color: ${firstColor}; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${firstResult}</span>
                                <span style="background-color: ${secondBg}; color: ${secondColor}; padding: 2px 8px; border-radius: 4px;">${secondResult}</span>
                            </div>
                        `;
                    } else {
                        displayResultHTML = `<span style="background-color: ${resultBgColor}; color: ${resultColor}; padding: 2px 8px; border-radius: 4px;">${displayResult}</span>`;
                    }

                    resultsHTML += `
                    <tr style="${idx % 2 === 0 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;'}">
                        <td style="padding: 8px; text-align: center; color: #475569; font-weight: 600; vertical-align: middle;" rowspan="2">
                            ${idx + 1}
                        </td>
                        <td style="padding: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: #0f172a; font-weight: 600;">-</span>
                                <span style="color: #0f172a;">${whitePlayerName}</span>
                                ${whiteRating > 0 ? `<span style="color: #64748b; font-size: 11px;">(${whiteRating})</span>` : ''}
                                <span style="margin-left: auto; font-size: 10px; color: #94a3b8; background-color: #e2e8f0; padding: 1px 6px; border-radius: 10px;">${t.common.white}</span>
                            </div>
                        </td>
                        <td style="padding: 8px; text-align: center; vertical-align: middle; font-weight: bold;" rowspan="2">
                            <span style="background-color: ${resultBgColor}; color: ${resultColor}; padding: 2px 8px; border-radius: 4px;">${displayResult}</span>
                        </td>
                    </tr>
                    
                    <tr style="${idx % 2 === 0 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;'}">
                        <td style="padding: 8px; border-top: none;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="color: #0f172a; font-weight: 600;">-</span>
                                <span style="color: #0f172a;">${blackPlayerName}</span>
                                ${blackRating > 0 ? `<span style="color: #64748b; font-size: 11px;">(${blackRating})</span>` : ''}
                                <span style="margin-left: auto; font-size: 10px; color: #94a3b8; background-color: #1e293b; padding: 1px 6px; border-radius: 10px; color: #f1f5f9;">${t.common.black}</span>
                            </div>
                        </td>
                    </tr>
                `;
                });

                resultsHTML += `
                    </tbody>
                </table>
            </div>
        `;
            });

            resultsHTML += `</div>`;
            return resultsHTML;
        };

        let htmlContent = `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tournamentName} - ${t.export.title}</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 20px; 
                line-height: 1.6;
                color: #1e293b;
                font-size: 13px;
            }
            .player-title {
                color: #ca8a04 !important;
                font-weight: bold !important;
                font-size: 12px !important;
            }
            .header { 
                background: linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%); 
                color: white; 
                padding: 20px; 
                border-radius: 8px;
                margin-bottom: 25px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .tournament-title { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 8px;
            }
            .tournament-info { 
                font-size: 13px; 
                opacity: 0.9;
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
            }
            .tournament-info span {
                background: rgba(255,255,255,0.2);
                padding: 4px 8px;
                border-radius: 16px;
            }
            .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #0f172a;
                margin: 30px 0 15px 0;
                padding-bottom: 6px;
                border-bottom: 2px solid #0ea5e9;
            }
            
            .bye-cell { 
                background-color: #f0fdf4 !important; 
                color: #166534 !important; 
                font-weight: bold !important;
                text-align: center !important;
                font-style: italic !important;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 25px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                border-radius: 6px;
                overflow: hidden;
                font-size: 12px;
            }
            th {
                background-color: #0ea5e9;
                color: white;
                padding: 10px 6px;
                text-align: center;
                font-weight: 600;
                font-size: 11px;
            }
            td {
                padding: 8px 6px;
                border: 1px solid #e2e8f0;
                text-align: center;
                font-size: 12px;
            }
            tr:nth-child(even) {
                background-color: #f8fafc;
            }
            .champion-row { background-color: #fef3c7 !important; }
            .second-row { background-color: #e2e8f0 !important; }
            .third-row { background-color: #fed7aa !important; }
            .player-name { text-align: left; }
            .points { font-weight: bold; color: #ca8a04; }
            .wins { color: #16a34a; font-weight: bold; }
            .draws { color: #ca8a04; }
            .losses { color: #dc2626; }
            .berger-table { 
                font-size: 12px !important;
                margin-top: 15px;
            }
            .berger-table th, .berger-table td { 
                padding: 6px 4px !important;
                font-size: 12px;
            }
            .white-bold { 
                font-weight: 800 !important; 
                color: #1e293b !important; 
                background-color: #dbeafe !important;
            }
            .black-normal { 
                font-weight: 400 !important; 
                color: #475569 !important; 
                background-color: #f1f5f9 !important;
            }
            .footer {
                margin-top: 40px;
                padding-top: 15px;
                border-top: 1px solid #e2e8f0;
                color: #64748b;
                font-size: 11px;
                text-align: center;
            }
            .results-table th {
                font-size: 11px !important;
                padding: 8px !important;
            }
            .results-table td {
                font-size: 12px !important;
                padding: 8px !important;
            }
            @media print {
                body { margin: 10px; font-size: 11px; }
                .header { background: #0ea5e9 !important; }
                th { background: #0ea5e9 !important; padding: 8px 4px; font-size: 10px; }
                td { padding: 6px 4px; font-size: 11px; }
                .berger-table th, .berger-table td { font-size: 10px !important; }
                .player-title { color: #ca8a04 !important; font-weight: bold !important; font-size: 11px !important; }
                .section-title { font-size: 16px !important; }
            }
            @media (max-width: 768px) {
                body { margin: 15px; font-size: 12px; }
                table { font-size: 11px; }
                .berger-table th, .berger-table td { font-size: 10px !important; }
                .player-title { font-size: 11px !important; }
                .section-title { font-size: 16px; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="tournament-title">${tournamentName}</div>
            <div class="tournament-info">
                ${city ? `<span>📍 ${city}</span>` : ''}
                <span>📅 ${date}</span>
                <span>👥 ${totalPlayers} ${t.common.players}</span>
                <span>🔄 ${totalRounds} ${t.common.rounds}</span>
                ${organizer ? `<span>🏢 ${organizer}</span>` : ''}
                ${isDouble ? `<span>♟️ ${t.export.doubleRoundRobin}</span>` : ''}
            </div>
        </div>
`;

        htmlContent += `
    <div class="section-title">${t.export.standings}</div>
    <table>
        <thead>
            <tr>
                <th>${t.export.headers.position}</th>
                <th class="player-name">${t.export.headers.name}</th>
                <th>${t.export.headers.points}</th>
                <th>${t.export.headers.sonneborn}</th>
                <th>${t.export.headers.directEncounter}</th>
                <th>${t.export.headers.wins}</th>
                <th>${t.export.headers.draws}</th>
                <th>${t.export.headers.losses}</th>
                <th>${t.export.headers.whitePoints}</th>
            </tr>
        </thead>
        <tbody>
`;

        standings.forEach((standing, index) => {
            const rowClass = index === 0 ? 'champion-row' :
                index === 1 ? 'second-row' :
                    index === 2 ? 'third-row' : '';

            const medal = index === 0 ? t.standings.medals.gold :
                index === 1 ? t.standings.medals.silver :
                    index === 2 ? t.standings.medals.bronze : '';

            // Pronađi igrača da dobiješ rejting
            const playerObj = players.find(p => p.id === standing.playerId);
            const playerRating = playerObj?.rating || '';

            htmlContent += `
        <tr class="${rowClass}">
            <td>${index + 1}${medal}</td>
            <td class="player-name">${standing.playerTitle ? `<strong class="player-title">${standing.playerTitle}</strong> ` : ''}${standing.playerName}${playerRating ? ` <span style="color: #64748b; font-size: 11px;">(${playerRating})</span>` : ''}</td>
            <td class="points">${standing.points.toFixed(1)}</td>
            <td>${standing.sonneborn.toFixed(1)}</td>
            <td>${standing.directEncounter.toFixed(1)}</td>
            <td class="wins">${standing.wins}</td>
            <td class="draws">${standing.draws}</td>
            <td class="losses">${standing.losses}</td>
            <td>${standing.whitePoints.toFixed(1)}</td>
        </tr>
    `;
        });

        htmlContent += `
        </tbody>
    </table>
`;

        htmlContent += `
    <div class="section-title">${t.export.bergerTable}</div>
    
    <table class="berger-table">
        <thead>
            <tr>
                <th>${t.export.headers.position}</th>
                <th style="text-align: left; min-width: 140px;">${t.export.headers.name}</th>
`;

        const sortedPlayers = [...players].sort((a, b) => a.startNumber - b.startNumber);
        sortedPlayers.forEach(player => {
            htmlContent += `<th>${player.startNumber}</th>`;
        });

        htmlContent += `
                <th>${t.export.headers.points}</th>
                <th>${t.export.headers.sonneborn}</th>
                <th>${t.export.headers.directEncounter}</th>
                <th>${t.export.headers.wins}</th>
                <th>${t.export.headers.whitePoints}</th>
            </tr>
        </thead>
        <tbody>
`;

        sortedPlayers.forEach((player, rowIndex) => {
            const playerStanding = standings.find(s => s.playerId === player.id);
            const playerPosition = standings.findIndex(s => s.playerId === player.id) + 1;

            const medal = playerPosition === 1 ? t.standings.medals.gold :
                playerPosition === 2 ? t.standings.medals.silver :
                    playerPosition === 3 ? t.standings.medals.bronze : '';

            htmlContent += `
        <tr class="${playerPosition === 1 ? 'champion-row' : playerPosition === 2 ? 'second-row' : playerPosition === 3 ? 'third-row' : ''}">
            <td>${playerPosition}${medal}</td>
            <td style="text-align: left;">${getPlayerShortName(player)}</td>
    `;

            sortedPlayers.forEach((opponent, colIndex) => {
                if (player.id === opponent.id) {
                    htmlContent += `<td style="background-color: #f1f5f9; color: #0ea5e9; font-weight: bold;">X</td>`;
                } else {
                    let matchResult = null;
                    let isWhite = false;
                    let firstRound = null;

                    // Pronađi prvi rezultat
                    for (const round of rounds) {
                        const matchAsWhite = round.matches.find(m =>
                            m.whitePlayerId === player.id && m.blackPlayerId === opponent.id
                        );

                        if (matchAsWhite) {
                            const resultKey = `${round.roundNumber}-${player.id}-${opponent.id}`;
                            matchResult = results[resultKey];
                            isWhite = true;
                            firstRound = round.roundNumber;
                            break;
                        }

                        const matchAsBlack = round.matches.find(m =>
                            m.whitePlayerId === opponent.id && m.blackPlayerId === player.id
                        );

                        if (matchAsBlack) {
                            const resultKey = `${round.roundNumber}-${opponent.id}-${player.id}`;
                            let result = results[resultKey];
                            // VAŽNO: Obrnuti rezultat jer je igrač igrao kao crni!
                            let reversedResult = result;
                            if (result === '1-0') reversedResult = '0-1';
                            else if (result === '0-1') reversedResult = '1-0';
                            matchResult = reversedResult;
                            isWhite = false;
                            firstRound = round.roundNumber;
                            break;
                        }
                    }

                    // Ako je dvokružni sistem, pronađi drugi rezultat
                    if (matchResult && isDouble && firstRound) {
                        const totalRounds = rounds.length;
                        const firstHalfRounds = Math.ceil(totalRounds / 2);
                        const secondRound = firstRound + firstHalfRounds;

                        for (const round of rounds) {
                            if (round.roundNumber === secondRound) {
                                // U drugoj rundi, boje su obrnute
                                const matchAsBlack = round.matches.find(m =>
                                    m.whitePlayerId === player.id && m.blackPlayerId === opponent.id
                                );

                                if (matchAsBlack) {
                                    const resultKey = `${round.roundNumber}-${player.id}-${opponent.id}`;
                                    const secondResult = results[resultKey];
                                    if (secondResult) {
                                        matchResult = `${matchResult}|${secondResult}`;
                                    }
                                    break;
                                }

                                const matchAsWhite = round.matches.find(m =>
                                    m.whitePlayerId === opponent.id && m.blackPlayerId === player.id
                                );

                                if (matchAsWhite) {
                                    const resultKey = `${round.roundNumber}-${opponent.id}-${player.id}`;
                                    const secondResult = results[resultKey];
                                    if (secondResult) {
                                        let reversedSecond = secondResult;
                                        if (secondResult === '1-0') reversedSecond = '0-1';
                                        else if (secondResult === '0-1') reversedSecond = '1-0';
                                        matchResult = `${matchResult}|${reversedSecond}`;
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    if (!matchResult) {
                        htmlContent += `<td>${t.export.placeholders.noResult}</td>`;
                    } else if (opponent.id.startsWith('BYE')) {
                        let byeRound = null;
                        for (const round of rounds) {
                            const byeMatch = round.matches.find(m =>
                                (m.whitePlayerId === player.id && m.blackPlayerId === opponent.id) ||
                                (m.whitePlayerId === opponent.id && m.blackPlayerId === player.id)
                            );
                            if (byeMatch) {
                                byeRound = round.roundNumber;
                                break;
                            }
                        }

                        htmlContent += `<td class="bye-cell">
                        <div style="font-size: 13px;">${t.common.bye}</div>
                        ${byeRound ? `<div style="font-size: 10px; margin-top: 2px;">${byeRound}</div>` : ''}
                        </td>`;
                    } else {
                        // Boje: Crveni bold za belog, Plavi normal za crnog
                        const whiteColor = '#dc2626'; // Crveni za belog
                        const blackColor = '#2563eb'; // Plavi za crnog

                        if (matchResult.includes('|')) {
                            const games = matchResult.split('|');
                            const game1 = games[0]; // Prvi meč
                            const game2 = games[1] || ''; // Drugi meč

                            // Konvertuj rezultate u brojevima (1, 0, ½)
                            let result1Display = game1 === '1-0' ? '1' : game1 === '0-1' ? '0' : '½';
                            let result2Display = game2 === '1-0' ? '1' : game2 === '0-1' ? '0' : '½';

                            // Prvo meč: isWhite je osnovna vrijednost
                            // Ako je igrao belog - prikaži kao crveni bold, ako crnog - inverz kao plavi normal
                            const firstGameColor = isWhite ? whiteColor : blackColor;
                            const firstGameWeight = isWhite ? 'bold' : 'normal';

                            // Drugi meč: obrnute boje (ako je u prvom bio beli, u drugom je crni)
                            const secondGameColor = isWhite ? blackColor : whiteColor;
                            const secondGameWeight = isWhite ? 'normal' : 'bold';

                            htmlContent += `<td style="padding: 0;">
                            <div style="border-bottom: 1px solid #e2e8f0; padding: 2px; font-size: 11px; color: ${firstGameColor}; font-weight: ${firstGameWeight};">${result1Display}</div>
                            <div style="padding: 2px; font-size: 11px; color: ${secondGameColor}; font-weight: ${secondGameWeight};">${result2Display}</div>
                        </td>`;
                        } else {
                            // Jedan meč - prikaži rezultat u pravoj boji
                            let displayResult = matchResult;

                            // Prikaži rezultat iz perspektive igrača
                            if (matchResult === '1-0') displayResult = isWhite ? '1' : '0';
                            else if (matchResult === '0-1') displayResult = isWhite ? '0' : '1';
                            else if (matchResult === '½-½') displayResult = '½';

                            const resultColor = isWhite ? whiteColor : blackColor;
                            const resultWeight = isWhite ? 'bold' : 'normal';

                            htmlContent += `<td style="font-size: 12px; color: ${resultColor}; font-weight: ${resultWeight};">${displayResult}</td>`;
                        }
                    }
                }
            });

            htmlContent += `
                <td class="points">${playerStanding?.points.toFixed(1) || '0.0'}</td>
                <td>${playerStanding?.sonneborn.toFixed(1) || '0.0'}</td>
                <td>${playerStanding?.directEncounter.toFixed(1) || '0.0'}</td>
                <td class="wins">${playerStanding?.wins || 0}</td>
                <td>${playerStanding?.whitePoints.toFixed(1) || '0.0'}</td>
            </tr>
        `;
        });

        htmlContent += `
            </tbody>
        </table>
    `;

        htmlContent += getCompleteResultsTable();

        htmlContent += `
        <div class="footer">
            <p>${t.export.generatedBy}</p>
            <p>${t.export.exportDate}: ${currentDate}</p>
            <p>${t.export.totalPlayers}: ${totalPlayers} • ${t.export.totalRounds}: ${totalRounds} ${isDouble ? `(${t.export.doubleRoundRobin})` : ''}</p>
        </div>
        </body>
        </html>
    `;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `berger-tournament-${tournamentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentDate}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!tournament || isEditingTournament) {
        return (
            <div className="mobile-device-container">
                <div className="mobile-device-screen">
                    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-[390px] mx-auto">
                            {isEditingTournament && tournament && (
                                <div className="mb-4 flex items-center justify-between">
                                    <button
                                        onClick={handleCancelEditTournament}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        {t.navigation.back}
                                    </button>

                                    <button
                                        onClick={handleDeleteTournament}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-700/30 text-red-300 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {t.navigation.deleteTournament}
                                    </button>
                                </div>
                            )}

                            <div className="mb-6 text-center">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                                    {isEditingTournament ? t.tournamentSetup.editTitle : t.common.appTitle}
                                </h1>
                                <p className="text-slate-400 text-xs">
                                    {isEditingTournament
                                        ? t.tournamentSetup.editSubtitle
                                        : t.common.appSubtitle}
                                </p>
                            </div>

                            <TournamentSetup
                                onTournamentCreated={handleTournamentCreated}
                                language={language}
                                initialData={isEditingTournament && tournament ? tournament : undefined}
                                isEditing={isEditingTournament}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mobile-device-container">
            <div className="mobile-device-screen">
                <div className="min-h-screen p-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="max-w-[390px] mx-auto space-y-4">
                        <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full -translate-y-8 translate-x-8"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-teal-500/5 rounded-full translate-y-10 -translate-x-10"></div>

                            <div className="flex flex-col relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <button
                                        onClick={handleEditTournament}
                                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors"
                                        title={t.navigation.editTournament}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <h1 className="text-lg font-bold text-white truncate">{tournament.name}</h1>

                                    <button
                                        onClick={handleNewTournament}
                                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors ml-auto"
                                        title={t.navigation.newTournament}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                                    <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg">
                                        <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-medium truncate">{tournament.city}</span>
                                    </div>

                                    <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg">
                                        <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium text-[10px]">{tournament.startDate} {tournament.endDate && `- ${tournament.endDate}`}</span>
                                    </div>

                                    {tournament.organizer && (
                                        <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg">
                                            <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="font-medium truncate max-w-[80px]">{tournament.organizer}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-center">
                                        <div className="text-slate-400 text-[10px] mb-0.5">{t.common.players}</div>
                                        <div className="text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">{players.length}</div>
                                    </div>

                                    {tournament.doubleRoundRobin && (
                                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-900/40 to-orange-900/40 text-amber-300 px-2 py-1 rounded-full text-[10px] border border-amber-700/30">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="font-semibold">{t.tournamentSetup.doubleRoundRobin}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            <button
                                onClick={() => setActiveTab('players')}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 text-xs ${
                                    activeTab === 'players'
                                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
                                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                }`}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75V21m0 0h-6m6 0h6" />
                                </svg>
                                {t.navigation.players}
                            </button>
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 text-xs ${
                                    activeTab === 'schedule'
                                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
                                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                }`}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                                </svg>
                                {t.navigation.schedule}
                            </button>
                            <button
                                onClick={() => setActiveTab('standings')}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 text-xs ${
                                    activeTab === 'standings'
                                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
                                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                }`}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                {t.navigation.standings}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeTab === 'players' && (
                                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                                            {t.playerEntry.title}
                                        </h2>
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <span className="text-[10px]">{t.common.active}:</span>
                                            <span className="text-base font-bold text-white">{players.length}</span>
                                        </div>
                                    </div>

                                    <PlayerEntry
                                        players={players}
                                        onPlayerAdded={handlePlayerAdded}
                                        onPlayerUpdated={handlePlayerUpdated}
                                        onPlayerDeleted={handlePlayerDeleted}
                                        onPlayersImported={handlePlayersImported}
                                        language={language}
                                        onNavigateToSchedule={() => setActiveTab('schedule')}
                                    />
                                </div>
                            )}

                            {activeTab === 'schedule' && (
                                <div>
                                    <Schedule
                                        rounds={rounds}
                                        results={results}
                                        onResultChange={handleResultChange}
                                        onFinish={() => setActiveTab('standings')}
                                        isDoubleRoundRobin={tournament.doubleRoundRobin}
                                        language={language}
                                    />
                                </div>
                            )}

                            {activeTab === 'standings' && (
                                <div className="space-y-4">
                                    <Standings
                                        standings={standings}
                                        players={players}
                                        language={language}
                                    />

                                    <BergerTable
                                        players={players}
                                        rounds={rounds}
                                        standings={standings}
                                        results={results}
                                        language={language}
                                        isDoubleRoundRobin={tournament.doubleRoundRobin}
                                    />

                                    {players.length > 0 && (
                                        <div className="pt-4 border-t border-slate-700/50">
                                            <div className="text-slate-400 text-[10px] bg-slate-800/50 px-2 py-1 rounded-lg text-center mb-2">
                                                {t.common.tournament} ID: <span className="text-cyan-300 font-mono">
                                                    {tournament.name.toLowerCase().replace(/\s+/g, '-').slice(0, 10)}-{Date.now().toString(36).slice(-4)}
                                                </span>
                                            </div>

                                            <button
                                                onClick={handleExportAll}
                                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow flex items-center justify-center gap-2 text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {t.navigation.exportAll} (HTML)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}