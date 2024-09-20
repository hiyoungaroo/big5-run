import { Animal } from '../types'
import { animals } from '../data/animals'

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
      <h2 className="text-xl md:text-2xl mb-4 text-center">캐릭터를 선택하세요</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-4">
        {animals.map((animal) => (
          <button
            key={animal.id}
            onClick={() => toggleAnimal(animal)}
            className={`p-1 md:p-2 border ${
              selectedAnimals.some(a => a.id === animal.id) ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <div className="aspect-square overflow-hidden">
              <img src={animal.image} alt={animal.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-1 text-xs md:text-sm">{animal.name}</p>
          </button>
        ))}
      </div>
      <button
        onClick={onStart}
        disabled={selectedAnimals.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto md:mx-auto md:block disabled:bg-gray-300"
      >
        START
      </button>
    </div>
  )
}