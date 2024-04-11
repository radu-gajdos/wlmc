import React from 'react';
import spinner from '../img/spinner.gif';

/**
 * Component for displaying a spinning animation.
 * @returns {JSX.Element} The Spinner component.
 */
const Spinner = () => (
    <div>
        <img src={spinner} alt='Loading...' />
    </div>
);

export default Spinner;