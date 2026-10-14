import { Head, Link, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const { auth } = usePage().props;  
    const [builds, setBuilds] = useState([]);

   
    useEffect(() => {
        const fetchBuilds = async () => {
            const response = await fetch('/api/builds', { headers: { Accept: 'application/json' } });
            const data = await response.json();
            setBuilds(Array.isArray(data) ? data : []);
        };
        fetchBuilds();
    }, []);

   
    const myCount = builds.filter((b) => b.user_id === auth.user.id).length;
    const countBy = (field, value) => builds.filter((b) => b[field] === value).length;

    const categories = ['House', 'Farm', 'Redstone', 'Castle', 'Statue', 'Village', 'Other'];

    const levelColors = {
        Easy: 'bg-green-500',
        Medium: 'bg-amber-400',
        Hard: 'bg-red-500',
    };

  
    const btn = 'border-2 border-black px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none';
    const card = 'border-2 border-black bg-stone-800 shadow-[4px_4px_0_#000]';
    const pixel = { fontFamily: "'Press Start 2P', monospace" };

    return (
        <>
            <Head title="Dashboard">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-stone-900 font-mono text-lg text-white">

           
                <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b-4 border-black bg-gradient-to-t from-blue-700 to-blue-400 px-6 py-4">
                    <Link href="/" className="text-sm" style={pixel}>WhattoBuild</Link>

                    <nav className="flex flex-wrap items-center gap-6">
                        <Link href="/" className="hover:text-green-400">Home</Link>
                        <Link href="/dashboard" className="text-green-400">Dashboard</Link>
                        <Link href="/builds" className="hover:text-green-400">Builds</Link>
                        <span className="text-sm text-stone-400">{auth.user.name}</span>
                        <Link href="/logout" method="post" as="button" className={`${btn} bg-red-500`}>Log out</Link>
                    </nav>
                </header>

                <main className="min-h-screen bg-gradient-to-b from-green-900 via-stone-900 to-stone-950 px-6 py-12">
                    <div className="mx-auto max-w-6xl">

                        <h1 className="text-xl leading-relaxed" style={pixel}>Welcome, {auth.user.name}</h1>
                        <p className="mt-3 text-stone-300">Here is what is happening on the site.</p>

            
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            <div className={`${card} p-5`}>
                                <p className="text-sm uppercase text-stone-400">Total ideas</p>
                                <p className="mt-2 text-4xl font-bold">{builds.length}</p>
                            </div>
                            <div className={`${card} p-5`}>
                                <p className="text-sm uppercase text-stone-400">Your ideas</p>
                                <p className="mt-2 text-4xl font-bold text-green-400">{myCount}</p>
                            </div>
                            <div className={`${card} p-5`}>
                                <p className="text-sm uppercase text-stone-400">Easy</p>
                                <p className="mt-2 text-4xl font-bold">{countBy('difficulty', 'Easy')}</p>
                            </div>
                            <div className={`${card} p-5`}>
                                <p className="text-sm uppercase text-stone-400">Medium</p>
                                <p className="mt-2 text-4xl font-bold">{countBy('difficulty', 'Medium')}</p>
                            </div>
                            <div className={`${card} p-5`}>
                                <p className="text-sm uppercase text-stone-400">Hard</p>
                                <p className="mt-2 text-4xl font-bold">{countBy('difficulty', 'Hard')}</p>
                            </div>
                        </div>

                        <div className="mt-10 p-4 mx-auto w-full max-w-2xl">

                       
                            <div className={`${card} p-6 text-center`}>
                                <h2 className="mb-6 text-sm" style={pixel}>Recent ideas</h2>

                                {builds.length === 0 && (
                                    <p className="text-stone-400">No ideas yet.</p>
                                )}

                                {builds.slice(0, 5).map((build) => (
                                    <div key={build.id} className="mb-4 border-b-2 border-black pb-4">
                                        <p className="font-bold">{build.title}</p>
                                        <div className="mt-2 flex items-center justify-center gap-2">
                                            <span className="border-2 border-black bg-sky-400 px-2 text-sm font-bold text-black">{build.category}</span>
                                            <span className={`${levelColors[build.difficulty]} border-2 border-black px-2 text-sm font-bold text-black`}>{build.difficulty}</span>
                                            <span className="text-md text-white font-extrabold"><span className='text-sm text-stone-400'>by</span> {build.user?.name}</span>
                                        </div>
                                    </div>
                                ))}

                                <Link href="/builds" className={`${btn} inline-block bg-green-500`}>Submit an idea</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}