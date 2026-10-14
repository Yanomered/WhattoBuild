import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Register() {
   
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', { onFinish: () => reset('password', 'password_confirmation') });
    };


    const card = 'border-2 border-black bg-stone-800 shadow-[4px_4px_0_#000]';
    const field = 'mt-1 w-full border-2 border-black bg-stone-900 p-2 text-white';
    const btn = 'border-2 border-black px-4 py-3 font-bold text-black shadow-[4px_4px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none';
    const pixel = { fontFamily: "'Press Start 2P', monospace" };

    return (
        <>
            <Head title="Sign up">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-700 via-amber-950 to-orange-900 px-6 py-12 font-mono text-lg text-white">
                <Link href="/" className="mb-8 text-xl" style={pixel}>WhattoBuild</Link>

                <form onSubmit={submit} className={`${card} w-full max-w-md space-y-5 p-8`}>
                    <h1 className="text-sm" style={pixel}>Sign up</h1>

                    <label className="block">Name
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                            className={field} autoFocus required />
                        {errors.name && <span className="block text-sm text-red-400">{errors.name}</span>}
                    </label>

                    <label className="block">Email
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            className={field} required />
                        {errors.email && <span className="block text-sm text-red-400">{errors.email}</span>}
                    </label>

                    <label className="block">Password
                        <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)}
                            className={field} required />
                        {errors.password && <span className="block text-sm text-red-400">{errors.password}</span>}
                    </label>

                    <label className="block">Confirm password
                        <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={field} required />
                        {errors.password_confirmation && <span className="block text-sm text-red-400">{errors.password_confirmation}</span>}
                    </label>

                    <button type="submit" disabled={processing} className={`${btn} w-full bg-green-500`}>Create account</button>

                    <p className="text-center text-base text-stone-300">
                        Already have an account? <Link href="/login" className="text-green-400 underline">Log in</Link>
                    </p>
                </form>

                <Link href="/" className="mt-6 text-sm hover:text-green-400">&larr; Back to home</Link>
            </div>
        </>
    )
}