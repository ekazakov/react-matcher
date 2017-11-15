import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { isEmptyChildren } from './utils';

function CaseFactory({ displayName, propTypes }) {
    const Component = (props) => {
        const { children } = props;

        if (typeof children === 'function') {
            return children();
        }

        if (!isEmptyChildren(children)) {
            return Children.only(children);
        }

        return null;
    };

    Component.displayName = displayName;
    Component.propTypes = propTypes;

    return Component;
}

export const Case = CaseFactory({
    displayName: 'Case',
    propTypes: {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func,
        ]),
        value: PropTypes.any.isRequired,
    }
});

export const DefaultCase = CaseFactory({
    displayName: 'DefaultCase',
    propTypes: {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func,
        ])
    }
});
