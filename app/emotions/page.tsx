import EmotionList from './emotionList';

const CurrentMonthFeelingsPage = () => {
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="text-2xl font-bold mb-4">Your {currentMonth}'s feelings</h1>
            <EmotionList />
        </main>
    );
};

export default CurrentMonthFeelingsPage;
