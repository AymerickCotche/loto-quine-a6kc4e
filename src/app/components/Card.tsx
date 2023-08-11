import { Card as CardInterface } from "@/store/features/cardSlice"

interface Props {
  card: CardInterface
}

const Card = ({card}: Props) => {
  
    return (
      <div>

        <div key={card.id} className="flex flex-col gap-1 border border-blue-800 rounded-md p-1 mb-1 md:p-3 md:mb-2">

          <span className="bg-orange-400 text-white px-2 py-1  md:px-3 md:py-2 rounded-2xl">{card.user.name}</span>

          <div className='grid grid-cols-5 border border-green-800'>
            {card.numbers.map(number => (
              <span key={number.number.value} className={number.number.drawn ? 'bg-green-200 py-2 px-1 text-center border border-green-800' : 'py-2 text-center border px-1 border-green-800'}>{number.number.value}</span>
            ))}
          </div>

          <span className="bg-blue-200   px-1 py-1  md:px-3 md:py-2 rounded-lg">N° {card.name}</span>

        </div>

      </div>
    )
  
}

export default Card
