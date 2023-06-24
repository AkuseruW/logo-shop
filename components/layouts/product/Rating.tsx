import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

export default function Rating({ value }: { value: number }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i}
                aria-label={`${i} star${value >= i ? 's' : ''}${value >= i - 0.5 && value < i ? '-half' : ''}`}
            >
                <FontAwesomeIcon icon={value >= i ? faStar : value >= i - 0.5 ? faStarHalfAlt : farStar} />
            </span>
        );
    }

    return <div className="rating">{stars}</div>;
}
