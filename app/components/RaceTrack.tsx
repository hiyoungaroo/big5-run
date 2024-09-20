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
            if (pos >= 85) return pos;
            const newPos = Math.min(pos + Math.random() * 2, 85);
            if (newPos === 85 && !results.some(r => r.animalId === animals[index].id)) {
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
    <div className="relative h-80 md:h-96 bg-yellow-200 overflow-hidden rounded-lg p-2 md:p-4">
      <div className="absolute inset-0 flex flex-col justify-between">
        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className="relative flex items-center h-8 md:h-10"
            style={{
              left: `${positions[index]}%`,
              transition: 'left 0.05s linear',
            }}
          >
            <span className="mr-1 md:mr-2 font-bold text-xs md:text-sm min-w-[2ch] md:min-w-[3ch] text-right">
              {getPlace(animal.id)}
            </span>
            <div className="w-6 h-6 md:w-8 md:h-8 overflow-hidden">
              <img src={animal.image} alt={animal.name} className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}