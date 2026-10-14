import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function Welcome({ auth }) {
    const [builds, setBuilds] = useState([]);

    useEffect(() => {
        const fetchBuilds = async () => {
            const response = await fetch('/api/builds', { headers: { Accept: 'application/json' } });
            const data = await response.json();
            setBuilds(Array.isArray(data) ? data : []);
        };
        fetchBuilds();
    }, []);

    const levelColors = {
        Easy: 'bg-green-500',
        Medium: 'bg-amber-400',
        Hard: 'bg-red-500',
    };

    const btn = 'inline-block border-2 border-black px-5 py-3 font-bold shadow-[4px_4px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none';
    const card = 'border-2 border-black bg-stone-800 shadow-[4px_4px_0_#000]';
    const pixel = { fontFamily: "'Press Start 2P', monospace" };

    return (
        <>
            <Head title="WhattoBuild">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-stone-900 text-lg text-white font-mono">

        
                <header className="sticky top-0 z-20 flex items-center justify-between border-b-4 border-black bg-gradient-to-tr from-blue-700  to-blue-300 px-6 py-4">
                    <span className="text-sm" style={pixel}>WhattoBuild</span>

                    <nav className="flex items-center gap-6">
                        <Link href="/" className="hover:text-green-400">Home</Link>
                        <a href="#ideas" className="hover:text-green-400">Ideas</a>
                        <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>

                        {auth?.user ? (
                            <Link href="/builds" className={`${btn} bg-green-500 text-black`}>Suggest a build</Link>
                        ) : (
                            <>
                                <Link href="/login" className={`${btn} bg-stone-700`}>Log in</Link>
                                <Link href="/register" className={`${btn} bg-green-500 text-black`}>Sign up</Link>
                            </>
                        )}
                    </nav>
                </header>

       
                <section className="min-h-screen items-center gap-12 bg-gradient-to-b from-green-700 via-amber-950 to-orange-900 px-6 py-12">
                <div className=' md:grid-cols-2 grid mt-20'>
                    <div className="mx-auto max-w-xl ml-16 -mt-4">
                        <h1 className="text-4xl leading-relaxed" style={pixel}>
                            What should I build in Minecraft?
                        </h1>
                        <p className="mt-6 text-xl text-stone-300">
                            If you have a good idea make an account, and send in your recommendation. I'll choose what to build!
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link href="/register" className={`${btn} bg-green-500 text-black`}>Get started</Link>
                            <a href="#ideas" className={`${btn} bg-stone-700`}>See ideas</a>
                        </div>
                    </div>

       
                    <div className={`${card} mx-auto w-full bg-white/10 max-w-md p-6 -mt-16`}>
                        <p className="text-sm uppercase text-stone-400">Example idea</p>
                        <h2 className="mt-1 mb-1 text-2xl font-bold">Floating Sky Island</h2>
                        <div className={card}>
            <img src="/images/builds/images.jpg" alt="Mountain castle"
                className="aspect-video w-full border-b-2 border-black object-cover transition-transform hover:scale-105" />
                        </div>
                        <p className="mt-3 text-stone-300">A small island in the sky over the clouds that has a cool looking house.</p>
                        
                        <div className="mt-4 flex gap-2">
                            <span className="border-2 border-black bg-sky-400 px-3 py-1 text-sm font-bold text-black">House</span>
                            <span className="border-2 border-black bg-red-500 px-3 py-1 text-sm font-bold text-black">Hard</span>
                        </div>
                    </div>
                </div>
                </section>

             
                <section className="border-y-4 border-black bg-gradient-to-b from-orange-950 to-amber-900  px-6 py-32">
                    <h2 className="mb-8 text-center text-xl" style={pixel}>How it works</h2>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                        <div className={`${card} p-6`}>
                            <p className="text-3xl font-bold text-green-400">1</p>
                            <h3 className="mt-2 text-xl font-bold">Make an account</h3>
                            <p className="mt-2 text-stone-300">Sign up for free in a few seconds.</p>
                        </div>
                        <div className={`${card} p-6`}>
                            <p className="text-3xl font-bold text-amber-400">2</p>
                            <h3 className="mt-2 text-xl font-bold">Submit an idea</h3>
                            <p className="mt-2 text-stone-300">Tell me what to build and how hard it is.</p>
                        </div>
                        <div className={`${card} p-6`}>
                            <p className="text-3xl font-bold text-sky-400">3</p>
                            <h3 className="mt-2 text-xl font-bold">See it on the site</h3>
                            <p className="mt-2 text-stone-300">Your idea shows up for everyone to find.</p>
                        </div>
                    </div>
                </section>

                    
                <section id="gallery" className="px-6 py-32 bg-gradient-to-b from-stone-600 to-zinc-900 border-y-4 border-black ">
                   <h2 className="mb-8 text-center text-2xl" style={pixel}>My builds</h2>
                   <p className='mb-8 text-center text-xs' style={pixel}>These are samples of my builds, I really like building and it's one of 
                    my main reasons I play Minecraft!
                   </p>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 text-center ">
                     <div className={card}>
                        <img src="/images/builds/windmill.png" alt="Mountain castle"
                        className="aspect-video w-full border-b-2 border-black object-cover transition-transform hover:scale-105" />
                        <p className="p-4 font-bold">Windmill and Farm</p>
                        <div className='mb-4'>
                            <span className="border-2 border-black bg-amber-400 px-3 py-1 text-sm font-bold text-black">Medium</span>
                        </div>
                     </div>
                     

                     <div className={card}>
                        <img src="/images/builds/twinhouse.jpg" alt="Village market"
                        className="aspect-video w-full border-b-2 border-black object-cover transition-transform hover:scale-105" />
                        <p className="p-4 font-bold">Twin/Connected House</p>
                        <div className='mb-4'>
                            <span className="border-2 border-black bg-amber-400 px-3 py-1 text-sm font-bold text-black">Medium</span>
                        </div>
                     </div>

                     <div className={card}>
                        <img src="/images/builds/portaltree.png" alt="Survival base"
                        className="aspect-video w-full border-b-2 border-black object-cover transition-transform hover:scale-105" />
                        <p className="p-4 font-bold">A Portal in a Big Tree</p>
                        <div className='mb-4'>
                            <span className="border-2 border-black bg-red-500 px-3 py-1 text-sm font-bold text-black">Hard</span>
                        </div>
                    </div>
                </div>
                     </section>

            
                <section id="ideas" className="min-h-screen scroll-mt-16 px-6 py-16 bg-gradient-to-b from-zinc-900 to-gray-950">
                    <h2 className="mb-8 text-center text-xl" style={pixel}>Latest ideas</h2>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                        {builds.length === 0 && (
                            <p className="text-stone-400 md:col-span-3">No ideas yet. Be the first to submit one!</p>
                        )}

                        {builds.slice(0, 6).map((build) => (
                            <div key={build.id} className={`${card} p-6`}>
                                <h3 className="text-xl font-bold">{build.title}</h3>
                                <p className="mt-2 text-stone-300">{build.description}</p>

                                <div className="mt-4 flex items-center gap-2">
                                    <span className="border-2 border-black bg-sky-400 px-3 py-1 text-sm font-bold text-black">{build.category}</span>
                                    <span className={`${levelColors[build.difficulty]} border-2 border-black px-3 py-1 text-sm font-bold text-black`}>{build.difficulty}</span>
                                </div>

                                <p className="mt-4 text-lg text-white"><span className='text-sm text-stone-400'>by</span> {build.user?.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

             
                <footer className="border-t-4 border-black bg-stone-950 px-6 py-8 text-center text-stone-400">
                    <p className="text-sm text-white" style={pixel}>WhattoBuild</p>
                    <p className="mt-3 text-base">I'm a builder in Minecraft, I like building, tell me whattobuild.</p>
                    <p className="mt-3 text-base">-Yanom.</p>
                </footer>

            </div>
        </>
    );
}