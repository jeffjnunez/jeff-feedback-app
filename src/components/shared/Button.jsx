import PropTypes from 'prop-types';

const Button = ({ children, id, version, type, isDisabled }) => {
    return (
        <button id={id} type={type} disabled={isDisabled} className={`btn btn-${version}`}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
};

export default Button;