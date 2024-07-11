import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ text, imageSrc, href, className }) => {
    const buttonContent = (
        <>
            {imageSrc && <img src={imageSrc} alt="Icon" className="mr-2" />}
            {text}
        </>
    );

    const baseClasses = "text-white bg-[#ff4700] hover:bg-[#e64500] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-center transition ease-in duration-300";
    const combinedClasses = `${baseClasses} ${className}`;

    return href ? (
        <a
            href={href}
            className={combinedClasses}
        >
            {buttonContent}
        </a>
    ) : (
        <button
            type="submit"
            className={combinedClasses}
        >
            {buttonContent}
        </button>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string
};

CustomButton.defaultProps = {
    imageSrc: null,
    href: null,
    className: ''
};

export default CustomButton;