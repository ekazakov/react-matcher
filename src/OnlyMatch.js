import React, { Children } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Case, DefaultCase } from './Case';
import { isEmptyChildren } from './utils';

export default function OnlyMatch(props) {
    const {
        children,
        value,
        predicate,
    } = props;

    if (isEmptyChildren(children)) {
        return null;
    }

    let match = null;
    let defaultElement = null;

    Children.forEach(children, (element) => {
        if (element.type === DefaultCase) {
            defaultElement = element;
        }

        if (!React.isValidElement(element) || element.type !== Case) {
            return;
        }

        if (!match && predicate(element.props.value, value)) {
            match = element;
        }
    });

    return match || defaultElement;
}

OnlyMatch.propTypes = {
    value: PropTypes.any.isRequired,
    predicate: PropTypes.func.isRequired,
};

OnlyMatch.defaultProps = {
    predicate: isEqual,
};