export function LotusIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6C16 6 12 10 12 16C12 19 13.5 21.5 16 23C18.5 21.5 20 19 20 16C20 10 16 6 16 6Z"
        fill="#d1d6c5"
        stroke="#989898"
        strokeWidth="0.5"
      />
      <path
        d="M16 23C13 21 8 19 6 14C6 14 8 20 12 23C13.5 24 14.8 24.5 16 25C17.2 24.5 18.5 24 20 23C24 20 26 14 26 14C24 19 19 21 16 23Z"
        fill="#e6efce"
        stroke="#989898"
        strokeWidth="0.5"
      />
      <path
        d="M16 23C14 22 10 21 7 17C7 17 9 22 13 24.5C14.2 25.2 15.2 25.6 16 26C16.8 25.6 17.8 25.2 19 24.5C23 22 25 17 25 17C22 21 18 22 16 23Z"
        fill="#d1d6c5"
        stroke="#989898"
        strokeWidth="0.5"
      />
    </svg>
  );
}
