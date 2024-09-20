import { Animal } from '../types'
import { animals } from '../data/animals'  // 여기서 animals를 import 합니다

interface Props {
  onSelect: (animals: Animal[]) => void
  onStart: () => void
  selectedAnimals: Animal[]
}

export default function AnimalSelection({ onSelect, onStart, selectedAnimals }: Props) {
  const toggleAnimal = (animal: Animal) => {
    const newSelection = selectedAnimals.some(a => a.id === animal.id)
      ? selectedAnimals.filter(a => a.id !== animal.id)
      : [...selectedAnimals, animal]
    onSelect(newSelection)
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">캐릭터를 선택하세요</h2>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {animals.map((animal) => (
          <button
            key={animal.id}
            onClick={() => toggleAnimal(animal)}
            className={`p-2 border ${
              selectedAnimals.some(a => a.id === animal.id) ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img src={animal.image} alt={animal.name} className="w-full h-24 object-contain" />
            <p className="mt-2 text-sm">{animal.name}</p>
          </button>
        ))}
      </div>
      <button
        onClick={onStart}
        disabled={selectedAnimals.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        START
      </button>
    </div>
  )
}