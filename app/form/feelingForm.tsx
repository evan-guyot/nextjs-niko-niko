'use client';

import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine, RiSendPlaneFill } from "@remixicon/react";
import { useEffect, useState } from "react";
import FeelingFormData from "./feelingFormData";
import { FormStatus } from "@/types/models/form";
import { addOrChangeFeeling, getTodaysFeeling } from "../lib/action";
import Link from "next/link";
import { Mood } from "@prisma/client";

export default function FeelingForm() {
    const [form, setForm] = useState<FeelingFormData>({ mood: "HAPPY", status: FormStatus.Filling, message: "" });
    const [answered, setAnswered] = useState<boolean>(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodaysFeeling = async () => {
            const todaysMood = await getTodaysFeeling();
            if (todaysMood) {
                setAnswered(true)
                setForm({ ...form, mood: todaysMood });
            }
            setLoading(false);
        };

        fetchTodaysFeeling();
    }, [form]); 

    const handleSubmit = async () => {
        setForm({ ...form, status: FormStatus.Loading });

        try {
            const formResponse = await addOrChangeFeeling(form);

            setForm(formResponse);
        } catch (_) {
            setForm({ ...form, status: FormStatus.Error, message: 'Submission failed. Please try again.' });
        }
    };

    return loading ? <p>loading..</p> : (
        <div>
            <p className="w-full text-center my-2">How do you feel today?</p>
            {
                answered && <p className="font-xs font-mono p-1 bg-gray-100 dark:bg-gray-900 rounded">You have answered already, but <span className="text-sky-500">you</span> <span className="text-indigo-500">can</span> <span className="text-purple-500">still</span> <span className="text-pink-500">change</span> your mind</p>
            }
            <ul className="items-center w-full my-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 pr-4">
                    <div className="flex items-center ps-3">
                        <input id="happy" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer" checked={form.mood === Mood.HAPPY} onChange={() => setForm({ ...form, mood: "HAPPY" })} disabled={form.status === FormStatus.Success} />
                        <label htmlFor="happy" className="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                            <RiEmotionHappyLine className="mx-auto my-1" />
                        </label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 pr-4">
                    <div className="flex items-center ps-3">
                        <input id="only-ok" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer" checked={form.mood === Mood.NORMAL} onChange={() => setForm({ ...form, mood: "NORMAL" })} disabled={form.status === FormStatus.Success} />
                        <label htmlFor="only-ok" className="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                            <RiEmotionNormalLine className="mx-auto my-1" />
                        </label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600 pr-4">
                    <div className="flex items-center ps-3">
                        <input id="sad" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer" checked={form.mood === Mood.SAD} onChange={() => setForm({ ...form, mood: "SAD" })} disabled={form.status === FormStatus.Success} />
                        <label htmlFor="sad" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                            <RiEmotionUnhappyLine className="mx-auto my-1" />
                        </label>
                    </div>
                </li>
            </ul>

            {form.status === FormStatus.Error && <p className="text-red-500 text-center">{form.message}</p>}

            {form.status === FormStatus.Success ? (
                <>
                    <p className="text-green-500 text-center">{form.message}</p>
                    <div className="w-full flex justify-center">
                        <Link href="/" className="my-2 text-gray-800 bg-white border border-gray-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700">
                            Go Back to Home
                        </Link>
                    </div>
                </>
            ) : (
                <div className="w-full flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="my-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700"
                        disabled={form.status === FormStatus.Loading}
                    >
                        Submit <RiSendPlaneFill className="text-gray-200 dark:text-gray-800 w-5 h-5 me-1 ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
