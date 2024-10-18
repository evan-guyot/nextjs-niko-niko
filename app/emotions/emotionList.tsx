'use client';

import { Mood } from "@prisma/client";
import { useEffect, useState } from "react";
import { getCurrentMonthFeelings } from "../lib/action";
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from "@remixicon/react";

export default function EmotionList() {
    const [feelings, setFeelings] = useState<{ date: Date; mood: Mood }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeelings = async () => {
            setLoading(true);
            try {
                const response = await getCurrentMonthFeelings();
                setFeelings(response || []);
            } catch (err) {
                setError('Failed to fetch feelings.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeelings();
    }, []);

    const renderMoodIcon = (mood: Mood) => {
        switch (mood) {
            case Mood.HAPPY:
                return <RiEmotionHappyLine className="text-2xl text-blue-500 mx-auto" />;
            case Mood.NORMAL:
                return <RiEmotionNormalLine className="text-2xl text-indigo-500 mx-auto" />;
            case Mood.SAD:
                return <RiEmotionUnhappyLine className="text-2xl text-pink-500 mx-auto" />;
            default:
                return null;
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return feelings.length === 0 ? (
        <p className="text-center text-gray-500">No feelings recorded for this month.</p>
    ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 mx-auto">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr className="rounded-t-lg">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Mood</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {feelings.map((feeling) => (
                        <tr key={feeling.date.toString()} className="text-center border-b border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                }).format(new Date(feeling.date))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {renderMoodIcon(feeling.mood)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
