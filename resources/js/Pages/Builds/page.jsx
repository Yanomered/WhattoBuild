import { Head, Link, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function BuildsPage() {
    const { auth } = usePage().props;  

    const emptyForm = { 
        title: '', 
        description: '', 
        category: '', 
        difficulty: '' 
    };

    const [formData, setFormData] = useState(emptyForm);
    const [builds, setBuilds] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

 
    const myBuilds = builds.filter((b) => b.user_id === auth.user.id);

    const fetchBuilds = async () => {
        const response = await fetch('/api/builds', { headers: { Accept: 'application/json' } });
        const data = await response.json();
        setBuilds(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchBuilds();
    }, []);

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId ? `/api/builds/${editingId}` : '/api/builds';
        await fetch(url, {
            method: editingId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...formData, user_id: auth.user.id }),
        });
        setFormData(emptyForm);
        setEditingId(null);
        fetchBuilds();
    };

  
    const handleEdit = (build) => {
        setFormData({
            title: build.title,
            description: build.description,
            category: build.category,
            difficulty: build.difficulty,
        });
        setEditingId(build.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        await fetch(`/api/builds/${id}`, { method: 'DELETE' });
        fetchBuilds();
    };

  
    const levelColors = {
        Easy: 'bg-green-500',
        Medium: 'bg-amber-400',
        Hard: 'bg-red-500',
    };


    const btn = 'border-2 border-black px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none';
    const card = 'border-2 border-black bg-stone-800 shadow-[4px_4px_0_#000]';
    const field = 'mt-1 w-full border-2 border-black bg-stone-900 p-2 text-white';
    const pixel = { fontFamily: "'Press Start 2P', monospace" };

    return (
        <>
            <Head title="Builds">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-stone-900 font-mono text-lg text-white">

               
                <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b-4 border-black bg-gradient-to-tr from-blue-700 to-blue-400 px-6 py-4">
                    <Link href="/" className="text-sm" style={pixel}>WhattoBuild</Link>

                    <nav className="flex flex-wrap items-center gap-6">
                        <Link href="/" className="hover:text-green-400">Home</Link>
                        <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>
                        <Link href="/builds" className="text-green-400">Builds</Link>
                        <span className="text-sm text-stone-400">{auth.user.name}</span>
                        <Link href="/logout" method="post" as="button" className={`${btn} bg-red-500`}>Log out</Link>
                    </nav>
                </header>

                <main className="bg-gradient-to-b from-green-900 via-stone-900 to-stone-950 px-6 py-12">
                    <div className="mx-auto max-w-3xl">

                   
                        <h1 className="mb-6 text-xl" style={pixel}>
                            {editingId ? 'Edit your idea' : 'Submit an idea'}
                        </h1>

                        <form onSubmit={handleSubmit} className={`${card} grid gap-4 p-6 md:grid-cols-2`}>
                            <label className="md:col-span-2">Title
                                <input name="title" value={formData.title} onChange={handleChange}
                                    placeholder="Floating Sky Island" className={field} required />
                            </label>

                            <label>Category
                                <select name="category" value={formData.category} onChange={handleChange} className={field} required>
                                    <option value="">Choose a category</option>
                                    <option>House</option>
                                    <option>Farm</option>
                                    <option>Redstone</option>
                                    <option>Castle</option>
                                    <option>Statue</option>
                                    <option>Village</option>
                                    <option>Other</option>
                                </select>
                            </label>

                            <label>Difficulty
                                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={field} required>
                                    <option value="">Choose a difficulty</option>
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </label>

                            <label className="md:col-span-2">Description
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                                    placeholder="What should I build, and why is it fun?" className={field} required />
                            </label>

                            <button type="submit" className={`${btn} bg-green-500 md:col-span-2`}>
                                {editingId ? 'Update idea' : 'Submit idea'}
                            </button>

                            {editingId && (
                                <button type="button" className={`${btn} bg-stone-500 md:col-span-2`}
                                    onClick={() => { setEditingId(null); setFormData(emptyForm); }}>
                                    Cancel
                                </button>
                            )}
                        </form>                        
                    </div>

                    <h2 className="mb-6 mt-16 text-xl text-center" style={pixel}>My ideas</h2>
                        
                        <div className={`${card} overflow-x-auto mx-auto max-w-5xl`}>
                            <table className="w-full text-left">
                                <thead className="bg-stone-950">
                                    <tr>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Difficulty</th>
                                        <th className="p-4">Description</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myBuilds.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-stone-400">You haven't submitted any ideas yet.</td>
                                        </tr>
                                    )}
                                    {myBuilds.map((build) => (
                                        <tr key={build.id} className="border-t-2 border-black">
                                            <td className="p-4 font-bold">{build.title}</td>
                                            <td className="p-4">
                                                <span className="border-2 border-black bg-sky-400 px-3 py-1 text-sm font-bold text-black">{build.category}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`${levelColors[build.difficulty]} border-2 border-black px-3 py-1 text-sm font-bold text-black`}>{build.difficulty}</span>
                                            </td>
                                            <div><td className="max-w-xs p-4 text-stone-300 whitespace-normal break-words ">{build.description}</td></div>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button className={`${btn} bg-sky-400`} onClick={() => handleEdit(build)}>Edit</button>
                                                    <button className={`${btn} bg-red-500`} onClick={() => handleDelete(build.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </main>
            </div>
        </>
    )
}