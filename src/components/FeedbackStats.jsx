import PropTypes from 'prop-types';

const FeedbackStats = ({ feedback }) => {
    // Calculate ratings avg
    let average = (feedback.reduce((acc, curr) => {
        return acc + curr.rating
    }, 0) / feedback.length) || 0;
    average = average.toFixed(1).replace(/[.,]0$/, '');

    return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Review{feedback.length !== 1 ? 's' : ''}</h4>
        <h4>Average Rating: {average}</h4>
    </div>
  );
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;