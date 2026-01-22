import { Player, Round, Standing, Match } from '@/lib/types';
import bergerTables from './berger-tables.json';

interface BergerTable {
    rounds: number;
    matches: number[][][];
    description: string;
}

export function generateSchedule(players: Player[], isDoubleRoundRobin: boolean): Round[] {
    const schedule: Round[] = [];

    // Odredi broj igrača
    const totalPlayers = players.length;

    // Ako nema igrača, vrati prazan raspored
    if (totalPlayers === 0) {
        return schedule;
    }

    const hasBye = totalPlayers % 2 !== 0;

    // Za neparan broj, koristi tabelu za sledeći paran broj
    const tableSize = hasBye ? totalPlayers + 1 : totalPlayers;

    // Pronađi najbližu dostupnu tabelu
    const availableSizes = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    let targetSize = 4;

    for (const size of availableSizes) {
        if (tableSize <= size) {
            targetSize = size;
            break;
        }
    }

    // Ako je veći od 30, vrati grešku
    if (tableSize > 30) {
        throw new Error(`Nema Berger tabele za ${tableSize} igrača. Maksimalno je 30.`);
    }

    // Uzmi tabelu iz JSON-a
    const table = (bergerTables as any)[targetSize.toString()] as BergerTable;
    if (!table) {
        throw new Error(`No Berger table available for ${tableSize} players. Maximum is 30.`);
    }

    // Sortiraj igrače po startnom broju
    const sortedPlayers = [...players].sort((a, b) => a.startNumber - b.startNumber);

    // Dodaj virtualne BYE igrače ako je potrebno
    const playersWithVirtual = [...sortedPlayers];
    if (hasBye) {
        playersWithVirtual.push({
            id: 'BYE',
            startNumber: playersWithVirtual.length + 1,
            title: '',
            surname: 'BYE',
            name: '',
            rating: 0,
            federation: '',
            club: '',
            sex: '-'
        });
    }

    // Generiši kola iz tabele
    for (let roundIndex = 0; roundIndex < table.rounds; roundIndex++) {
        const roundMatches = table.matches[roundIndex];
        const matches: Match[] = [];

        for (const [whiteNum, blackNum] of roundMatches) {
            // Prilagodi brojeve (Berger tabele su 1-based)
            const whiteIndex = whiteNum - 1;
            const blackIndex = blackNum - 1;

            // PROVERA: Da li indeksi postoje u nizu
            if (whiteIndex >= playersWithVirtual.length || blackIndex >= playersWithVirtual.length) {
                console.warn(`Invalid player indices in round ${roundIndex + 1}: white=${whiteIndex}, black=${blackIndex}`);
                continue;
            }

            const whitePlayer = playersWithVirtual[whiteIndex];
            const blackPlayer = playersWithVirtual[blackIndex];

            // PROVERA: Da li igrači postoje
            if (!whitePlayer || !blackPlayer) {
                console.warn(`Player not found in round ${roundIndex + 1}: white=${whiteIndex}, black=${blackIndex}`);
                continue;
            }

            // Preskoči BYE vs BYE
            if (whitePlayer.id === 'BYE' && blackPlayer.id === 'BYE') continue;

            matches.push({
                round: roundIndex + 1,
                board: matches.length + 1,
                whitePlayerId: whitePlayer.id,
                whitePlayerName: `${whitePlayer.surname} ${whitePlayer.name.charAt(0)}.`,
                whiteRating: whitePlayer.rating,
                blackPlayerId: blackPlayer.id,
                blackPlayerName: `${blackPlayer.surname} ${blackPlayer.name.charAt(0)}.`,
                blackRating: blackPlayer.rating
            });
        }

        schedule.push({
            roundNumber: roundIndex + 1,
            matches: matches
        });
    }

    // Ako je dvokružno, dodaj drugu polovinu sa obrnutim bojama
    if (isDoubleRoundRobin) {
        const firstHalfRounds = schedule.length;

        for (let i = 0; i < firstHalfRounds; i++) {
            const originalRound = schedule[i];
            const reversedMatches: Match[] = originalRound.matches.map(match => ({
                round: match.round + firstHalfRounds,
                board: match.board,
                whitePlayerId: match.blackPlayerId,
                whitePlayerName: match.blackPlayerName,
                whiteRating: match.blackRating,
                blackPlayerId: match.whitePlayerId,
                blackPlayerName: match.whitePlayerName,
                blackRating: match.whiteRating
            }));

            schedule.push({
                roundNumber: originalRound.roundNumber + firstHalfRounds,
                matches: reversedMatches
            });
        }
    }

    return schedule;
}

export function calculateStandings(
    players: Player[],
    rounds: Round[],
    results: Record<string, string>
): Standing[] {
    const standings: Standing[] = [];

    for (const player of players) {
        let points = 0;
        let gamesPlayed = 0;
        let wins = 0;
        let draws = 0;
        let losses = 0;
        let directEncounter = 0;
        let sonneborn = 0;
        let whitePoints = 0;

        // Prođi kroz sve mečeve i saberi rezultate
        for (const round of rounds) {
            for (const match of round.matches) {
                const resultKey = `${round.roundNumber}-${match.whitePlayerId}-${match.blackPlayerId}`;
                const result = results[resultKey];

                let playerIsWhite = false;
                let playerIsBlack = false;

                if (match.whitePlayerId === player.id) {
                    playerIsWhite = true;
                } else if (match.blackPlayerId === player.id) {
                    playerIsBlack = true;
                }

                if (playerIsWhite || playerIsBlack) {
                    gamesPlayed++;

                    if (result === '1-0') {
                        if (playerIsWhite) {
                            points += 1;
                            wins++;
                            whitePoints += 1;
                        } else {
                            losses++;
                        }
                    } else if (result === '0-1') {
                        if (playerIsBlack) {
                            points += 1;
                            wins++;
                        } else {
                            losses++;
                        }
                    } else if (result === '½-½' || result === '1/2-1/2') {
                        points += 0.5;
                        draws++;
                        if (playerIsWhite) {
                            whitePoints += 0.5;
                        }
                    }

                    // Pronađi protivnika
                    let opponentPoints = 0;
                    const opponentId = playerIsWhite ? match.blackPlayerId : match.whitePlayerId;

                    for (const round2 of rounds) {
                        for (const match2 of round2.matches) {
                            const resultKey2 = `${round2.roundNumber}-${match2.whitePlayerId}-${match2.blackPlayerId}`;
                            const result2 = results[resultKey2];

                            let opponentIsWhite = false;
                            let opponentIsBlack = false;

                            if (match2.whitePlayerId === opponentId) {
                                opponentIsWhite = true;
                            } else if (match2.blackPlayerId === opponentId) {
                                opponentIsBlack = true;
                            }

                            if (opponentIsWhite || opponentIsBlack) {
                                if (result2 === '1-0') {
                                    if (opponentIsWhite) {
                                        opponentPoints += 1;
                                    }
                                } else if (result2 === '0-1') {
                                    if (opponentIsBlack) {
                                        opponentPoints += 1;
                                    }
                                } else if (result2 === '½-½' || result2 === '1/2-1/2') {
                                    opponentPoints += 0.5;
                                }
                            }
                        }
                    }

                    // Sonneborn - zbir rezultata protiv igrača sa boljim rezultatima
                    if (playerIsWhite) {
                        if (result === '1-0') {
                            sonneborn += opponentPoints;
                        } else if (result === '½-½' || result === '1/2-1/2') {
                            sonneborn += opponentPoints * 0.5;
                        }
                    } else {
                        if (result === '0-1') {
                            sonneborn += opponentPoints;
                        } else if (result === '½-½' || result === '1/2-1/2') {
                            sonneborn += opponentPoints * 0.5;
                        }
                    }
                }
            }
        }

        standings.push({
            playerId: player.id,
            playerName: `${player.surname} ${player.name.charAt(0)}.`,
            playerTitle: player.title || '',
            position: 0,
            points: points,
            gamesPlayed: gamesPlayed,
            wins: wins,
            draws: draws,
            losses: losses,
            directEncounter: 0,  // Inicijalno 0, popuniće se nakon
            sonneborn: sonneborn,
            whitePoints: whitePoints
        });
    }

    // Sortiraj po redosledu:
    // 1. Poeni
    // 2. Sonneborn
    // 3. Direct Encounter (Head to Head)
    // 4. Wins
    // 5. WhitePoints (CRNI POENI) - ODLUČUJUĆI KRITERIJUM!
    standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.sonneborn !== a.sonneborn) return b.sonneborn - a.sonneborn;
        if (b.directEncounter !== a.directEncounter) return b.directEncounter - a.directEncounter;
        if (b.wins !== a.wins) return b.wins - a.wins;
        // POSLEDNJI I ODLUČUJUĆI: CRNI POENI
        return b.whitePoints - a.whitePoints;
    });

    // Dodelj pozicije
    for (let i = 0; i < standings.length; i++) {
        standings[i].position = i + 1;
    }

    // DIREKTAN SUSRЕТ - Direct Encounter
    // Logika: Samo između igrača koji dele ISTO mesto (isti broj poena)
    for (let i = 0; i < standings.length; i++) {
        const currentStanding = standings[i];
        const currentPoints = currentStanding.points;

        // Pronađi sve igrače sa istim brojem poena (dele mesto)
        const tiedPlayers = standings.filter(s => s.points === currentPoints);

        if (tiedPlayers.length > 1) {
            // Postoji najmanje 2 igrača sa istim poenom
            let deScore = 0;

            // Saberi rezultate između svih koji dele mesto
            for (const round of rounds) {
                for (const match of round.matches) {
                    const resultKey = `${round.roundNumber}-${match.whitePlayerId}-${match.blackPlayerId}`;
                    const result = results[resultKey];

                    // Proveri da li je trenutni igrač u meču
                    let playerIsWhite = false;
                    let playerIsBlack = false;
                    let opponentIsInTiedGroup = false;
                    const opponent = match.whitePlayerId === currentStanding.playerId ? match.blackPlayerId : match.whitePlayerId;

                    if (match.whitePlayerId === currentStanding.playerId) {
                        playerIsWhite = true;
                    } else if (match.blackPlayerId === currentStanding.playerId) {
                        playerIsBlack = true;
                    }

                    // Proveri da li je protivnik u grupi koja deli mesto
                    if (tiedPlayers.some(tp => tp.playerId === opponent)) {
                        opponentIsInTiedGroup = true;
                    }

                    if ((playerIsWhite || playerIsBlack) && opponentIsInTiedGroup) {
                        if (result === '1-0') {
                            if (playerIsWhite) {
                                deScore += 1;
                            }
                        } else if (result === '0-1') {
                            if (playerIsBlack) {
                                deScore += 1;
                            }
                        } else if (result === '½-½' || result === '1/2-1/2') {
                            deScore += 0.5;
                        }
                    }
                }
            }

            currentStanding.directEncounter = deScore;
        } else {
            // Nema drugih igrača sa istim poenom - nema Direct Encounter
            currentStanding.directEncounter = 0;
        }
    }

    return standings;
}