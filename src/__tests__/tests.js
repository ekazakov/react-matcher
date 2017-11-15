import React from 'react';
import { mount } from 'enzyme';
import isMatch from 'lodash/isMatch';
import { OnlyMatch, Case, DefaultCase } from '../index';

describe('OnlyMatch', () => {
    it('should match primitive type', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value}>
                <Case value={1}><span>Case One</span></Case>
                <Case value={2}><span>Case Two</span></Case>
                <Case value={3}><span>Case Three</span></Case>
            </OnlyMatch>
        );
        expect(mount(<Test value={1}/>)).toHaveText('Case One');
        expect(mount(<Test value={2}/>)).toHaveText('Case Two');
        expect(mount(<Test value={3}/>)).toHaveText('Case Three');
    });

    it('should match objects', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value}>
                <Case value={{ x: 1 }}><span>Case One</span></Case>
                <Case value={{ x: 1, y: 2 }}><span>Case Two</span></Case>
                <Case value={{ x: 2 }}><span>Case Three</span></Case>
            </OnlyMatch>
        );
        expect(mount(<Test value={{ x: 1 }}/>)).toHaveText('Case One');
        expect(mount(<Test value={{ x: 1, y: 2 }}/>)).toHaveText('Case Two');
        expect(mount(<Test value={{ x: 2 }}/>)).toHaveText('Case Three');
    });

    it('should match default case if nothing matched', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value}>
                <Case value={1}><span>Case One</span></Case>
                <Case value={2}><span>Case Two</span></Case>
                <DefaultCase><span>Case Three</span></DefaultCase>
            </OnlyMatch>
        );
        expect(mount(<Test value={3}/>)).toHaveText('Case Three');
    });

    it('should be empty if nothing matched', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value}>
                <Case value={1}><span>Case One</span></Case>
            </OnlyMatch>
        );
        const match = mount(<Test value={3}/>).find(OnlyMatch).children();
        expect(match).toBeEmpty();
    });

    it('should render first matched component', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value}>
                <Case value={1}><span>Case One</span></Case>
                <Case value={2}><span>Case Two</span></Case>
                <Case value={2}><span>Case Three</span></Case>
            </OnlyMatch>
        );
        expect(mount(<Test value={2}/>)).toHaveText('Case Two');
    });

    it('should use custom predicate function', () => {
        const Test = ({ value }) => (
            <OnlyMatch value={value} predicate={isMatch}>
                <Case value={{ x: 1, c: 1 }}><span>Case One</span></Case>
                <Case value={{ y: 1, b: 1 }}><span>Case Two</span></Case>
                <Case value={{ z: 1, l: 1 }}><span>Case Three</span></Case>
            </OnlyMatch>
        );
        expect(mount(<Test value={{ x: 1 }}/>)).toHaveText('Case One');
        expect(mount(<Test value={{ b: 1 }}/>)).toHaveText('Case Two');
        expect(mount(<Test value={{ l: 1 }}/>)).toHaveText('Case Three');
    });
});

describe('Case', () => {
    it('should render children node', () => {
        const Test = () => (
            <Case value={1}>
                <div>Test</div>
            </Case>
        );

        expect(mount(<Test />)).toContainReact(<div>Test</div>);
    });

    it('should render children function', () => {
        const Test = () => (
            <Case value={1}>
                {() => <div>Test</div>}
            </Case>
        );

        expect(mount(<Test />)).toContainReact(<div>Test</div>);
    })
});