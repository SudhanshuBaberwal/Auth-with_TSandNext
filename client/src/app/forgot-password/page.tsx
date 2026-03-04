"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import axiosInstance from "@/lib/axios"; // Assuming you have this set up like the login page

type ForgotPasswordData = { email: string };

export default function ForgotPassword() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordData>();
    
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useGSAP(() => {
        gsap.from(".animate-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
        setLoading(true);

        try {
            // Replace with your actual API endpoint
            await axiosInstance.post("/api/forgot-password", { email: data.email });
            
            toast.success("Reset link sent!");
            setIsSent(true);
            reset(); // Clears the input field

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send reset link.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl text-center">
                
                {/* Icon & Header */}
                <div className="animate-item mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
                    <p className="text-zinc-400 text-sm">
                        {isSent 
                            ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder." 
                            : "Enter your email address and we'll send you a link to reset your password."}
                    </p>
                </div>

                {/* Form */}
                {!isSent && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                        <div className="animate-item">
                            <label className="block text-sm text-zinc-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                            {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                        </div>

                        <div className="pt-2 animate-item">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Sending link...</span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* Back to Login Link */}
                <div className="animate-item mt-8 flex justify-center">
                    <Link href="/login" className="text-zinc-500 hover:text-white text-sm flex items-center gap-2 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}