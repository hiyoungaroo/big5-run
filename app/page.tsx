'use client'

import { useState, useCallback } from 'react'
import AnimalSelection from './components/AnimalSelection'
import RaceTrack from './components/RaceTrack'
import { Animal, RaceResult } from './types'
// import { animals } from './data/animals'  // 이 줄을 제거하거나 주석 처리하세요

export default function Home() {
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([])
  const [isRacing, setIsRacing] = useState(false)
  const [results, setResults] = useState<RaceResult[]>([])

  const startRace = () => {
    if (selectedAnimals.length > 0) {
      setIsRacing(true)
      setResults([])
    }
  }

  const handleFinish = useCallback((animalId: number) => {
    setResults(prev => {
      if (prev.some(r => r.animalId === animalId)) return prev;
      const newResults = [...prev, { animalId, place: prev.length + 1 }];
      if (newResults.length === selectedAnimals.length) {
        setIsRacing(false);
      }
      return newResults;
    });
  }, [selectedAnimals.length]);

  const resetGame = () => {
    setSelectedAnimals([])
    setIsRacing(false)
    setResults([])
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BIG5 RUN</h1>
      {!isRacing && results.length === 0 && (
        <AnimalSelection
          onSelect={setSelectedAnimals}
          onStart={startRace}
          selectedAnimals={selectedAnimals}
        />
      )}
      {(isRacing || results.length > 0) && (
        <RaceTrack 
          animals={selectedAnimals} 
          results={results} 
          isRacing={isRacing} 
          onFinish={handleFinish}
        />
      )}
      {!isRacing && results.length > 0 && (
        <button
          onClick={resetGame}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          처음부터
        </button>
      )}
    </main>
  )
}