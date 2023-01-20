export const AlignRightIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      onClick={onClick}
    >
      <path
        opacity="0.260086"
        d="M12.5 11.5V15.5L0.5 15.5V11.5L12.5 11.5Z"
        stroke="black"
      />
      <path
        opacity="0.260086"
        d="M12.5 4.5V8.5L4.5 8.5V4.5L12.5 4.5Z"
        stroke="black"
      />
      <path d="M15.5 0.5L15.5 19.5" stroke="black" strokeLinecap="square" />
    </svg>
  )
}
