import { Children } from 'react';
export const isEmptyChildren = (children) => {
    return children && Children.count(children) === 0;
};