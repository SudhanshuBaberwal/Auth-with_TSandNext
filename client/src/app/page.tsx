"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SimpleHome() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Smooth staggered reveal for the hero section and navbar
        gsap.from(".hero-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        });

        // Slight delay, then reveal the feature cards
        gsap.from(".feature-card", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5,
        });
    }, { scope: containerRef });

    const [loading , setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axiosInstance.get("/api/check-auth")
            } catch (error) {
                router.push("/login")
            }
        }
        checkAuth()
    } , [])

    const handleSubmit = async(e :React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axiosInstance.get("/api/logout");
            toast.success("Logout Successfully")
            setLoading(false)
            router.push("/login")

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-blue-500/30">
            
            {/* Navigation Bar */}
            <nav className="hero-item flex items-center justify-between p-6 max-w-7xl mx-auto">
                <div className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
                    Nexus
                </div>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <button onClick={handleSubmit} className="bg-red-600 text-white-950 px-4 py-2 rounded-lg cursor-pointer">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-4xl mx-auto text-center pt-32 pb-24 px-6">
                <div className="hero-item inline-block mb-4 px-3 py-1 border border-zinc-800 bg-zinc-900/50 rounded-full text-xs text-blue-400 font-medium tracking-wide uppercase">
                    Platform v2.0 is live
                </div>
                <h1 className="hero-item text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                    Build the future. <br /> Keep it simple.
                </h1>
                <p className="hero-item text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
                    A minimalist toolkit designed for developers who want to ship fast and scale easily. Secure your account and start building today.
                </p>
                <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/signup" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
                        Get Started
                    </a>
                    <a href="/features" className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-medium px-8 py-3 rounded-lg transition-colors">
                        Documentation
                    </a>
                </div>
            </main>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Feature 1 */}
                    <div className="feature-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Secure by Default</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Enterprise-grade security built directly into your workflow. Your data is encrypted and protected.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Lightning Fast</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Optimized for performance. Experience seamless navigation and instant data loading.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Clean Interface</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            A distraction-free environment that helps you focus on what actually matters: your work.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
}