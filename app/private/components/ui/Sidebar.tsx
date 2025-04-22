'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { Home, User, Settings, LogOut, BookOpen, UserPlus, ClipboardList, FilePlus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
    { label: "Dashboard", href: "/private", icon: <Home size={25} />, private: true },
    { label: "Profile", href: "/private/profile", icon: <User size={25} />, private: true },
    { label: "Trainings", href: "/private/trainings", icon: <BookOpen size={25} />, private: true },
    { label: "Modules", href: "/private/modules", icon: <ClipboardList size={25} />, private: true }, // Nouveau lien pour Modules
    { label: "Reviews", href: "/private/reviews", icon: <ClipboardList size={25} />, private: true },
    { label: "Submit Work", href: "/private/submit", icon: <FilePlus size={25} />, private: true },
    { label: "Settings", href: "/settings", icon: <Settings size={25} />, private: true },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getUser();
            setIsLoggedIn(!!data.user);
        };
        checkAuth();
    }, [pathname]);

    useEffect(() => {
        if (isLoggedIn === null) return;
        if (!isLoggedIn && !['/login', '/register'].includes(pathname)) {
            router.push('/login');
        }
    }, [isLoggedIn, pathname, router]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
            return;
        }
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <div className="fixed top-0 left-0 h-full w-48 border-r border-stone-500 bg-stone-900 text-stone-100">
            <Image
                src="/logo_blanc.png"
                alt="Logo"
                width={48}
                height={48}
                className="mx-auto my-6"
            />
            <nav className="flex flex-col h-full justify-between px-2 mt-12">
                <div className="flex flex-col gap-1">
                    {navItems
                        .filter((item) => !item.private || isLoggedIn)
                        .map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-full ${
                                    pathname === item.href ? 'bg-stone-700' : 'hover:bg-stone-500'
                                } transition-all duration-200 ease-in-out text-sm font-medium font-[var(--font-geist-mono)]`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}

                    {!isLoggedIn && pathname === "/login" && (
                        <Link
                            href="/register"
                            className="flex items-center gap-3 px-4 py-2 rounded-full bg-transparent border-1 hover:bg-stone-500 transition-all duration-200 ease-in-out text-sm font-medium font-[var(--font-geist-mono)]"
                        >
                            <UserPlus size={25} />
                            <span className="text-base">Register</span>
                        </Link>
                    )}

                    {!isLoggedIn && pathname === "/register" && (
                        <Link
                            href="/login"
                            className="flex items-center gap-3 px-4 py-2 rounded-full bg-transparent border-1 hover:bg-stone-500 transition-all duration-200 ease-in-out text-sm font-medium font-[var(--font-geist-mono)]"
                        >
                            <LogOut size={25} />
                            <span className="text-base">Login</span>
                        </Link>
                    )}

                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 rounded-full bg-transparent border-1 hover:bg-stone-500 transition-all duration-200 ease-in-out text-sm font-medium font-[var(--font-geist-mono)]"
                        >
                            <LogOut size={25} />
                            <span>Logout</span>
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
}
