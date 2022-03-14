import { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Card from './shared/Card';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item }) => {
    const {
        feedbackEdit,
        editFeedback,
        deleteFeedback
    } = useContext(FeedbackContext);

    const [isReversed, setIsReversed] = useState(false);

    const isBeingEdited = () => {
        if (!feedbackEdit || !feedbackEdit.item) {
            return false;
        }

        return feedbackEdit.item.id === item.id;
    };

    useEffect(() => {
        setIsReversed(isBeingEdited());
    }, [feedbackEdit]);

    return (
        <Card reverse={isReversed}>
            <div className='num-display'>{item.rating}</div>
            <button onClick={() => editFeedback(item)} className='edit'>
                <FaEdit color='purple' />
            </button>
            <button onClick={() => deleteFeedback(item.id)} className='close'>
                <FaTimes color='purple' />
            </button>
            <div className='text-display'>{item.text}</div>
        </Card>
    );
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FeedbackItem;