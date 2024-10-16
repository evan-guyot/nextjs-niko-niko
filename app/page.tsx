import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine, RiHeart2Fill } from "@remixicon/react";

export default function Home() {
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome on Niko-Niko</h1>
        <p className="w-full text-center">Tell us how you are felling today</p>
        <div className="flex justify-around w-full">
          <RiEmotionHappyLine />
          <RiEmotionNormalLine />
          <RiEmotionUnhappyLine />
        </div>
        <button type="button" className="mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700">
          Share your feelings <RiHeart2Fill className="text-pink-500 w-5 h-5 me-1 ml-2" />
        </button>
      </main>
  );
}
