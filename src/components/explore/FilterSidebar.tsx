'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useFilterStore } from '@/lib/store/filterStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const countriesList = ['USA', 'UK', 'Canada', 'Australia', 'Japan', 'Germany', 'France', 'South Korea', 'Singapore', 'Italy'];
const majorsList = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law', 'Design', 'Architecture', 'Literature', 'Economics', 'Philosophy'];

function FilterContent({
    countries,
    university,
    major,
    toggleCountry,
    handleUniversityChange,
    handleMajorChange,
    handleReset,
}: {
    countries: string[];
    university: string;
    major: string;
    toggleCountry: (country: string) => void;
    handleUniversityChange: (val: string) => void;
    handleMajorChange: (val: string) => void;
    handleReset: () => void;
}) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-base text-foreground">Filters</h3>
                <button
                    onClick={handleReset}
                    className="text-xs font-medium text-muted hover:text-primary transition-colors"
                >
                    Reset All
                </button>
            </div>

            <div>
                <h4 className="font-medium text-sm text-foreground mb-2.5">University</h4>
                <Input
                    placeholder="Search universities..."
                    value={university}
                    onChange={(e) => handleUniversityChange(e.target.value)}
                />
            </div>

            <div>
                <h4 className="font-medium text-sm text-foreground mb-2.5">Target Country</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {countriesList.map(country => (
                        <label key={country} className="flex items-center gap-2.5 cursor-pointer group rounded-lg px-2 py-1.5 hover:bg-surface-hover transition-colors">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={countries?.includes(country)}
                                onChange={() => toggleCountry(country)}
                            />
                            <div className={`flex items-center justify-center w-4 h-4 border rounded transition-all ${countries?.includes(country)
                                ? 'border-primary bg-primary'
                                : 'border-border group-hover:border-primary/50'
                                }`}>
                                {countries?.includes(country) && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-foreground">{country}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-medium text-sm text-foreground mb-2.5">Major</h4>
                <select
                    className="w-full rounded-xl border border-border bg-surface text-foreground px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-11 transition-colors hover:border-primary/30 focus:border-primary appearance-none cursor-pointer"
                    value={major}
                    onChange={(e) => handleMajorChange(e.target.value)}
                >
                    <option value="">Any Major</option>
                    {majorsList.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export function FilterSidebar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { countries, university, major, setFilters, resetFilters } = useFilterStore();

    useEffect(() => {
        const defaultCountries = searchParams.getAll('country');
        const defaultUniversity = searchParams.get('university') || '';
        const defaultMajor = searchParams.get('major') || '';

        setFilters({
            countries: defaultCountries.length ? defaultCountries : [],
            university: defaultUniversity,
            major: defaultMajor
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const updateUrl = (newFilters: { countries?: string[]; university?: string; major?: string }) => {
        const params = new URLSearchParams();
        if (newFilters.countries?.length) {
            newFilters.countries.forEach((c: string) => params.append('country', c));
        }
        if (newFilters.university) params.set('university', newFilters.university);
        if (newFilters.major) params.set('major', newFilters.major);
        router.push(`/explore?${params.toString()}`, { scroll: false });
    };

    const toggleCountry = (country: string) => {
        const newCountries = countries?.includes(country)
            ? countries.filter(c => c !== country)
            : [...(countries || []), country];
        setFilters({ countries: newCountries });
        updateUrl({ countries: newCountries, university, major });
    };

    const handleUniversityChange = (val: string) => {
        setFilters({ university: val });
        updateUrl({ countries, university: val, major });
    };

    const handleMajorChange = (val: string) => {
        setFilters({ major: val });
        updateUrl({ countries, university, major: val });
    };

    const handleReset = () => {
        resetFilters();
        router.push('/explore', { scroll: false });
    };

    const activeFilterCount = (countries?.length || 0) + (university ? 1 : 0) + (major ? 1 : 0);

    const filterProps = {
        countries: countries || [],
        university: university || '',
        major: major || '',
        toggleCountry,
        handleUniversityChange,
        handleMajorChange,
        handleReset,
    };

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
                <Button
                    variant="secondary"
                    onClick={() => setIsMobileOpen(true)}
                    className="w-full justify-center gap-2"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-full rounded-2xl bg-surface p-6 shadow-sm border border-border">
                <FilterContent {...filterProps} />
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                            className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <FilterContent {...filterProps} />
                            <div className="mt-6 pt-4 border-t border-border">
                                <Button className="w-full" onClick={() => setIsMobileOpen(false)}>
                                    Show Results
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
