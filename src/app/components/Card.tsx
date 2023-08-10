import { Card as CardInterface } from "@/store/features/cardSlice"

interface Props {
  card: CardInterface
}

const Card = ({card}: Props) => {
  
    return (
      <div>

        <div key={card.id} className="border border-blue-800 rounded-md p-3 mb-2 ">
          <div className="flex justify-between mb-2 items-center">
            <span className="bg-blue-200   px-3 py-2 rounded-2xl">N° {card.name}</span>
            <span className="bg-orange-400 text-white  px-3 py-2 rounded-2xl">{card.user.name}</span>
          </div>
          <div className='grid grid-cols-5 border border-green-800'>
            {card.numbers.map(number => (
              <span key={number.number.value} className={number.number.drawn ? 'bg-green-200 py-2 text-center border border-green-800' : 'py-2 text-center border border-green-800'}>{number.number.value}</span>
            ))}
          </div>
        </div>

      </div>
    )
  
}

export default Card
