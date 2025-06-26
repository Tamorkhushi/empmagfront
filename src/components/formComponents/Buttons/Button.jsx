
export const Button = ({ name, type, style, onClick }) => {
  return (
    <div>
      <button type={type} onClick={onClick} className={`text-[#fafafa] bg-[#074799] hover:bg-[#001A6E] h-[2rem] sm:h-[2.4rem] md:h-[2.5rem] my-1 rounded-md ${style}`}>{name}</button>
    </div>
  )
}

