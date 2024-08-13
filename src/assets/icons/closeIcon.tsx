const CloseIcon = ({
    strokeWidth = 1.5,
    className,
}: {
    strokeWidth?: number;
    className?: string;
}) => {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
        className={`${className} stroke-current`}
    >
        <path d="M18 6 6 18" /><path d="m6 6 12 12"
            strokeWidth={strokeWidth}
        />
    </svg>);
};

export default CloseIcon;