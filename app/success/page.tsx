"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export default function SuccessPage() {
    const router = useRouter();
    const { user, status } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (status === 'loading') return; // Wait for auth check

        if (!user) {
            router.push('/login'); // Redirect if not authenticated
            return;
        }

        // Redirect to dashboard after 3 seconds if authenticated
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, user, status]);

    if (status === 'loading') {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-primary mb-4">Payment Success!</h1>
                <p className="text-lg text-muted-foreground">
                    You will get an unlockKey to unlock the course.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Redirecting to dashboard in a few seconds...
                </p>
            </div>
        </div>
    );
}