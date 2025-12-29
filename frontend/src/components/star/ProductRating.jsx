import RatingStar from "./RatingStars";
import "./RatingStars.css";

const ProductRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        let fill = 0;

        if (rating >= i) {
            fill = 100;
        } else if (rating > i - 1) {
            fill = (rating - (i - 1)) * 100;
        }

        stars.push(<RatingStar key={i} fill={fill} />);
    }

    return (
        <div className="tp-stars align-items-center">
            {stars}
            <span className="ms-2 text-muted">({rating.toFixed(1)})</span>
        </div>
    );
};

export default ProductRating;
