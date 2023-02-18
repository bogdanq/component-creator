export const AlignMiddleIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      onClick={onClick}
    >
      <path opacity="0.260086" d="M4.5 0.5H8.5V12.5H4.5V0.5Z" stroke="black" />
      <path
        opacity="0.260086"
        d="M11.5 2.5H15.5V10.5H11.5V2.5Z"
        stroke="black"
      />
      <path d="M0.5 6.5H19.5" stroke="black" strokeLinecap="square" />
    </svg>
  )
}
