import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal.js';

export default options => {
    if (typeof options === 'string' || React.isValidElement(options)) {
        // eslint-disable-next-line no-param-reassign
        options = {
            message: options,
        };
    }

    const wrapper = document.body.appendChild(document.createElement('div'));

    // eslint-disable-next-line react/no-render-return-value
    const Component = ReactDOM.render(<Modal {...options} />, wrapper);

    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        setTimeout(() => {
            wrapper.remove();
        });
    };

    return Component.promise.always(cleanup).promise();
};
