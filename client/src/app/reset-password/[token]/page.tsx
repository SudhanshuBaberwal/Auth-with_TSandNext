"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
type ResetPasswordData = { 
    password: string; 
    confirmPassword: string;
};

export default function ResetPassword() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const params = useParams()
    const token = params.token as string
    

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordData>();
    const [loading, setLoading] = useState(false);

    // Watch the password field so we can compare it to confirmPassword
    const newPassword = watch("password");

    useGSAP(() => {
        gsap.from(".animate-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
        setLoading(true);

        try {
            
            await axiosInstance.post(`/api/reset-password/${token}`, { 
                newPassword: data.password, 
            });
            
            toast.success("Password reset successfully!");
            
            router.push("/login");

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to reset password.");
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Create New Password</h1>
                    <p className="text-zinc-400 text-sm">
                        Your new password must be different from previously used passwords.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                    
                    {/* New Password */}
                    <div className="animate-item">
                        <label className="block text-sm text-zinc-400 mb-1">New Password</label>
                        <input
                            type="password"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="animate-item">
                        <label className="block text-sm text-zinc-400 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: (value) => value === newPassword || "Passwords do not match"
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        {errors.confirmPassword && <span className="text-red-400 text-xs mt-1 block">{errors.confirmPassword.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 animate-item">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="animate-pulse">Resetting...</span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}