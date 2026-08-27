function StarRating({ value, onChange }) {

    return (
        <span>
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" onClick={() => onChange(value === n ? null: n)}>
                    {value >= n ? '★' : '☆' }
                </button>
            ))}
        </span>
    );
}

export default StarRating;