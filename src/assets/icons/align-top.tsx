export const AlignTopIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      onClick={onClick}
    >
      <path opacity="0.260086" d="M4.5 3.5H8.5V15.5H4.5V3.5Z" stroke="black" />
      <path
        opacity="0.260086"
        d="M11.5 3.5H15.5V11.5H11.5V3.5Z"
        stroke="black"
      />
      <path d="M0.5 0.5H19.5" stroke="black" strokeLinecap="square" />
    </svg>
  )
}
