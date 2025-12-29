import "./RatingStars.css";

const RatingStars = ({ fill = 0 }) => {
    return (
        <div className="tp-star">
            <div
                className="tp-star-fill"
                style={{ width: `${fill}%` }}
            />

            <span className="tp-star-divider" />

            <svg
                className="tp-star-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M12 2.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.47L12 17.9 6.2 20.4l1.1-6.47L2.6 9.33l6.5-.95L12 2.5z" />
            </svg>

        </div>
    );
};

export default RatingStars;
