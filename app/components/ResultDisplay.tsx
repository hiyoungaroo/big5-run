import { RaceResult, Animal } from '../types'

interface Props {
  results: RaceResult[]
  animals: Animal[]
}

export default function ResultDisplay({ results, animals }: Props) {
  return (
    <div>
      <h2 className="text-2xl mb-4">경주 결과</h2>
      <ul>
        {results.slice(0, 3).map((result) => {
          const animal = animals.find(a => a.id === result.animalId)
          return (
            <li key={result.animalId} className="mb-2">
              {result.place}등: {animal?.name}
              <img src={animal?.image} alt={animal?.name} className="w-8 h-8 inline-block ml-2" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}