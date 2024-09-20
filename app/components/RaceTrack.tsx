import { Animal, RaceResult } from '../types'
import { useEffect, useState } from 'react'

interface Props {
  animals: Animal[]
  results: RaceResult[]
  isRacing: boolean
  onFinish: (animalId: number) => void
}

export default function RaceTrack({ animals, results, isRacing, onFinish }: Props) {
  const [positions, setPositions] = useState<number[]>(animals.map(() => 0))

  useEffect(() => {
    if (isRacing) {
      const interval = setInterval(() => {
        setPositions((prev) => 
          prev.map((pos, index) => {
            if (pos >= 90) return pos;
            const newPos = Math.min(pos + Math.random() * 2, 90);
            if (newPos === 90 && !results.some(r => r.animalId === animals[index].id)) {
              onFinish(animals[index].id);
            }
            return newPos;
          })
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isRacing, animals, results, onFinish]);

  const getPlace = (animalId: number) => {
    const result = results.find(r => r.animalId === animalId);
    if (result && result.place <= 3) {
      return `${result.place}등`;
    }
    return null;
  };

  return (
    <div className="relative h-96 bg-yellow-200 overflow-hidden">
      {animals.map((animal, index) => (
        <div
          key={animal.id}
          className="absolute flex items-center"
          style={{
            left: `${positions[index]}%`,
            top: `${(index / animals.length) * 100}%`,
            transition: 'left 0.05s linear',
          }}
        >
          <span className="mr-2 font-bold text-xl min-w-[3ch] text-right">
            {getPlace(animal.id)}
          </span>
          <img src={animal.image} alt={animal.name} className="w-12 h-12" />
        </div>
      ))}
    </div>
  )
}