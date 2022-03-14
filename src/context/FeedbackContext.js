import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    // Not using persistent data for the vercel-deployment branch.
    useEffect(() => {
        // fetchFeedback();
        setIsLoading(false);
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();

        setFeedback(data);
        setIsLoading(false);
    };

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    // const addFeedback = async (newFeedback) => {
    //     const response = await fetch('/feedback', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newFeedback)
    //     });

    //     const data = await response.json();

    //     setFeedback([data, ...feedback]);
    // };

    // Set item to be updated.
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: JSON.stringify(item) === '{}' ? false : true,
        });
    };

    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => {
            return item.id === id ? { ...item, ...updatedItem } : item;
        }));
    }

    // const updateFeedback = async (id, updatedItem) => {
    //     const response = await fetch(`/feedback/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updatedItem),
    //     });

    //     const data = await response.json();

    //     setFeedback(feedback.map((item) => {
    //         return item.id === id ? { ...item, ...data } : item;
    //     }));
    // };

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            // await fetch(`/feedback/${id}`, { method: 'DELETE' });

            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    return (
        <FeedbackContext.Provider
            value={{
                isLoading,
                feedback,
                feedbackEdit,
                addFeedback,
                editFeedback,
                updateFeedback,
                deleteFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;