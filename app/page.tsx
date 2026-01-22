'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashPage() {
    const [selectedLang, setSelectedLang] = useState('sr');
    const [isClient, setIsClient] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLanguageSelect = (lang: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('berger-language', lang);
        }
        setRedirecting(true);
        window.location.href = `/${lang}`;
    };

    // Ako nije client-side, prikaži loading
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-cyan-400 text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">

            {/* Naslov */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Berger Tournament
                </h1>
                <p className="text-gray-400 mt-2">Professional Chess Pairing System</p>
            </div>

            {/* Kontejner za sliku */}
            <div className="relative w-full max-w-4xl h-[600px] mb-8">
                {/* Pozadinski efekat */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/20 to-teal-700/10 rounded-3xl blur-2xl"></div>

                {/* Glavni kontejner sa 3D efektom */}
                <div
                    className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-cyan-500/40 shadow-2xl"
                    style={{
                        transform: 'rotate(-8deg) perspective(1200px) rotateX(25deg)',
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center 30%',
                        boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 0 0 1px rgba(6, 182, 212, 0.3),
                            0 25px 50px -12px rgba(0, 0, 0, 0.7),
                            0 10px 30px -10px rgba(6, 182, 212, 0.5)
                        `
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            transform: 'scale(1.3)',
                            top: '0%',
                            left: '0%',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Image
                            src="/berger-table.png"
                            alt="Berger Tournament Pairing Table Diagram"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                            sizes="(max-width: 768px) 100vw, 768px"
                            style={{
                                objectPosition: 'left top'
                            }}
                        />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/15 via-transparent to-blue-900/25 z-5"></div>
                </div>

                {/* 3D efekat senke */}
                <div
                    className="absolute -bottom-6 left-1/2 w-[90%] h-8 transform -translate-x-1/2 bg-gradient-to-t from-black/50 to-transparent blur-xl rounded-full"
                    style={{
                        transform: 'rotate(-8deg) translateX(-50%)',
                        filter: 'blur(15px)'
                    }}
                ></div>
            </div>

            {/* Zastavice ispod slike */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-md w-full">
                <h2 className="text-white text-center text-lg font-medium mb-4">
                    Select Language / Izaberite Jezik
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { lang: 'sr', label: 'Српски', flag: '/flag-rs.png', color: 'border-red-500 hover:border-red-400' },
                        { lang: 'ru', label: 'Русский', flag: '/flag-ru.png', color: 'border-blue-500 hover:border-blue-400' },
                        { lang: 'en', label: 'English', flag: '/flag-en.png', color: 'border-green-500 hover:border-green-400' },
                        { lang: 'de', label: 'Deutsch', flag: '/flag-de.png', color: 'border-yellow-500 hover:border-yellow-400' }
                    ].map(({ lang, label, flag, color }) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`flex flex-col items-center p-3 rounded-xl border-2 ${color} bg-gray-800/50 hover:bg-gray-800 transition-all duration-200 hover:scale-105 group`}
                            aria-label={
                                lang === 'sr' ? 'Izaberite srpski jezik' :
                                    lang === 'en' ? 'Select English language' :
                                        lang === 'de' ? 'Wählen Sie die deutsche Sprache' :
                                            'Выберите русский язык'
                            }
                            disabled={redirecting}
                        >
                            <div className="relative w-20 h-14 mb-2 rounded-lg overflow-hidden">
                                <Image
                                    src={flag}
                                    alt={label}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                            <span className="text-white font-medium text-sm group-hover:text-cyan-300">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>© Copyright IA Tasic Vladimir</p>
                    <p className="text-xs mt-1">Round Robin pairing system</p>
                </div>
            </div>

            {/* Loading overlay */}
            {redirecting && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-cyan-400 text-lg">Preusmeravanje...</p>
                    </div>
                </div>
            )}
        </div>
    );
}