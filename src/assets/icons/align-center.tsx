export const AlignCenterIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      width="13"
      height="20"
      viewBox="0 0 13 20"
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
        d="M10.5 4.5V8.5L2.5 8.5V4.5L10.5 4.5Z"
        stroke="black"
      />
      <path d="M6.5 0.5L6.5 19.5" stroke="black" strokeLinecap="square" />
    </svg>
  )
}
