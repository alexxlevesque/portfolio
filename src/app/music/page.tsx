'use client';

import Link from 'next/link';

export default function Music() {
    const timeline = [
        {
            year: '2024',
            title: 'Milestone Year',
            description: 'Won a Grammy alongside Killer Mike, and had my songs played around the world with artists I listened to since high school.',
        },
        {
            year: '2023',
            title: 'First Songs with Major Artists',
            description: 'Landed my first songs with A Boogie, Roddy Ricch, Quavo, and eventually Killer Mike.',
        },
        {
            year: '2022',
            title: 'Network Expansion and Outreach',
            description: 'Cold-messaged 10 producers/managers/artists every day, sent daily emails with my music attached to 1000+ people to gain traction.',
        },
        {
            year: '2020',
            title: 'Social Media Outreach',
            description: 'First created my instagram and youtube accounts through COVID, where I started posting my music.',
        },
    ];

    const songs = [
        {
            title: 'Act Up - Killer Mike, Young Nudy',
            description: 'Original brass composition, December 29, 2021',
            audioSrc: '/music/killermike.mp3',
        },
        {
            title: 'G63 - Polo G, Offset',
            description: 'Original composition, June 22, 2023',
            audioSrc: '/music/polog.mp3',
        },
        {
            title: 'One More Summer - NoCap',
            description: 'Original guitar track, November 23, 2023',
            audioSrc: '/music/nocap.mp3',
        },
        {
            title: 'PABLO - Est Gee, Yo Gotti',
            description: 'Original sample, February 6, 2024',
            audioSrc: '/music/estgee.mp3',
        },
    ];

    const reflections = [
        {
            title: 'Passion Project',
            body: 'What started as just a passion project turned into a full-time commitment. None of it was easy, nor forced. Because I was passionate about it, growth was inevitable. I believe this is applicable to any goal or dream one may have. If you are truly passionate about something, you will find a way to make it happen. Even if you fail countless times, you are doing what you love and you will find a way to make it happen. There were many times where I envied other producers or my unreleased songs were close to being released, but never were. However, looking back, I can only think of the positive outcomes and thank myself for not giving up.',
        },
        {
            title: 'Networking',
            body: 'A common phrase in the music industry is that you are your own business, and that 80% of success is networking. I focused on networking and outreach to expand my reach and gain traction in the industry. My main goals were to connect with people with a similar mindset to me, and to take every opportunity presented to me. This easily segways to building a network for future career opportunities. Being able to have offer value to people you meet is key to building a real and meaningful relationship.',
        },
        {
            title: 'Driven Mindset',
            body: 'I went years producing music with no success. It was crucial that I stayed motivated and looked at failures as learning opportunities. This stage is where most music producers give up, and broadily speaking, where most people in general give up on their dreams. Arguably the biggest outcome of my music career is losing any hesitation to step out of my comfort zone. I believe developing this mindset at any stage of your life is the ultimatum to realizing your dreams.',
        },
    ];

    return (
        <div className="space-y-16">
            {/* Header */}
            <header className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-isabelline tracking-tight">Music</h1>
                <p className="text-rose_quartz text-sm leading-relaxed max-w-2xl">
                    I thought I would share my journey in the music industry, the story of how I got here, and some of the works I've created. My objective with sharing my music journey is to inspire others to have the right thought process is realizing whatever dreams they may have.
                </p>
            </header>

            {/* ───────── Story: Timeline ───────── */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">Story</h2>
                    <span className="text-xs text-white/30 uppercase tracking-wider">Timeline</span>
                </div>

                <div className="relative pl-6 border-l-2 border-space_cadet/20 space-y-10">
                    {timeline.map((item, i) => (
                        <div key={i} className="relative">
                            {/* Dot on the timeline */}
                            <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-steel_blue border-2 border-steel_blue/30 shadow-sm shadow-steel_blue/20" />
                            <span className="inline-block text-xs font-bold text-rose_quartz uppercase tracking-wider mb-1">
                                {item.year}
                            </span>
                            <h3 className="text-base font-bold text-isabelline mb-1">{item.title}</h3>
                            <p className="text-sm text-pale_dogwood leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───────── Songs ───────── */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">Original Compositions</h2>
                    <span className="text-xs text-white/30 uppercase tracking-wider">Productions</span>
                </div>

                <div className="space-y-6">
                    {songs.map((song, i) => (
                        <div
                            key={i}
                            className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                {/* Track number */}
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-steel_blue flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                    {String(i + 1).padStart(2, '0')}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-isabelline mb-0.5">{song.title}</h3>
                                    <p className="text-xs text-rose_quartz">{song.description}</p>
                                </div>
                            </div>

                            {/* Audio player */}
                            <div className="mt-4">
                                <audio controls preload="none" className="w-full h-10 rounded-lg">
                                    <source src={song.audioSrc} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* ───────── Reflection ───────── */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">Reflection</h2>
                    <span className="text-xs text-white/30 uppercase tracking-wider">Thoughts</span>
                </div>

                <div className="space-y-10">
                    {reflections.map((r, i) => (
                        <div key={i}>
                            <h3 className="text-lg font-bold text-isabelline mb-2">{r.title}</h3>
                            <p className="text-sm text-pale_dogwood leading-relaxed">{r.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───────── Links ───────── */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h2 className="text-xl font-serif font-bold text-pale_dogwood">Links</h2>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-pale_dogwood uppercase tracking-wider font-medium">
                    <a
                        href="https://open.spotify.com/playlist/5StQUHdTuoxMFTDnhml6ot?si=56b6a2d707f64e3c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-steel_blue transition-colors inline-flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                        Spotify Discography
                    </a>

                    <a
                        href="https://www.instagram.com/prodalyx/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-steel_blue transition-colors inline-flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Instagram
                    </a>

                    <a
                        href="https://music.apple.com/ca/playlist/alyx-the-producers/pl.081e202a2e3043648ee7ca60073ae53c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-steel_blue transition-colors inline-flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.297.228.45.042.9.07 1.353.074.727.005 23.45.004 23.783-.003.39-.008.778-.04 1.163-.1a5.03 5.03 0 001.92-.718c1.122-.735 1.87-1.74 2.188-3.05.127-.52.196-1.056.217-1.592.01-.26.026-.52.026-.78V6.16l-.005-.036zm-6.67 3.747c0 2.212.003 4.425-.003 6.637 0 .403-.038.803-.154 1.19-.186.624-.55 1.108-1.11 1.437-.402.236-.84.37-1.305.4-.64.043-1.252-.037-1.79-.378-.677-.428-.97-1.06-.96-1.846.01-.66.322-1.18.868-1.553.376-.256.802-.39 1.245-.47.514-.094 1.032-.16 1.546-.243.274-.044.503-.17.62-.437.076-.172.105-.363.105-.552V8.098a.63.63 0 00-.102-.375.549.549 0 00-.392-.234c-.16-.023-.323-.02-.484.003-.49.07-.98.148-1.467.228l-3.9.642c-.334.057-.528.253-.576.59-.007.048-.013.098-.013.148v.012c-.004 2.938-.003 5.877-.006 8.816 0 .395-.033.787-.142 1.168-.18.63-.543 1.118-1.114 1.453-.4.236-.843.37-1.308.4-.64.044-1.253-.032-1.79-.372-.678-.43-.975-1.06-.964-1.85.01-.662.325-1.183.873-1.557.375-.256.8-.39 1.244-.472.515-.094 1.034-.16 1.55-.245.31-.05.52-.207.625-.51.054-.16.074-.33.074-.502V7.263c0-.19.027-.372.122-.54.126-.22.33-.33.567-.374.1-.018.202-.035.303-.053L17.12 5.28c.477-.08.956-.155 1.434-.234.167-.028.336-.048.505-.027.31.04.495.237.526.55.006.063.009.128.009.192v4.104h-.27z" />
                        </svg>
                        Apple Music
                    </a>

                    <a
                        href="https://www.youtube.com/@prodalyx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-steel_blue transition-colors inline-flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        YouTube
                    </a>

                </div>
            </section>

            {/* Footer nav */}
            <section>
                <div className="flex flex-wrap gap-6 text-sm text-space_cadet/80 uppercase tracking-wider font-bold">
                    <Link href="/" className="hover:text-steel_blue transition-colors">Home</Link>
                    <Link href="/projects" className="hover:text-steel_blue transition-colors">Projects</Link>
                    <Link href="/library" className="hover:text-steel_blue transition-colors">Library</Link>
                </div>
            </section>
        </div>
    );
}
