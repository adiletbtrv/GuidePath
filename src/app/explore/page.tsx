import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FilterSidebar } from '@/components/explore/FilterSidebar';
import { GuideGrid } from '@/components/explore/GuideGrid';

export const metadata = {
    title: 'Explore Guides | GuidePath',
    description: 'Find international students to mentor you through your study abroad journey.',
};

export default function ExplorePage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-8 mt-20 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Explore Guides</h1>
                    <p className="mt-2 text-muted">Find the perfect mentor for your target country and university.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                    <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24">
                        <Suspense fallback={<div className="h-96 bg-surface animate-pulse rounded-2xl border border-border" />}>
                            <FilterSidebar />
                        </Suspense>
                    </aside>

                    <div className="flex-1 w-full relative min-h-[500px]">
                        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-surface/50 rounded-2xl" />}>
                            <GuideGrid />
                        </Suspense>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
