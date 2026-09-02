function Padlock({ unlocked = false, size = 20, className }) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className} role="img" aria-label={unlocked ? 'Unlocked' : 'Locked'}>
            <rect x="3" y="11" width="18" height="10" rx="2" />
            {unlocked
                ? <path d="M8 11V7a4 4 0 0 1 7.5-2" />
                : <path d="M8 11V7a4 4 0 0 1 8 0v4" />}
        </svg>
    );
}

export default Padlock;
