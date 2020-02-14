import {
    replaceSpecialSymbols,
    insertAnswerToRandomIndex,
    getAnswerClassName
} from './Questions';
import Questions from './Questions'
import React from 'react';
import renderer from 'react-test-renderer';

describe("Questions", () => {

    test('renders correctly', () => {
        const tree = renderer
            .create(<Questions />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("replaceSpecialSymbols -> replaces special symbols", () => {
        expect(replaceSpecialSymbols('&quot;')).toBe('"');
        expect(replaceSpecialSymbols('test &#039; test')).toBe('test ′ test')
    });

    test("insertAnswerToRandomIndex -> length isn't changed", () => {
        expect(insertAnswerToRandomIndex('e',
            [
                'a',
                'v',
                'f',
                'd'
            ]).length).toBe(5)
    })

    test("getAnswerClassName -> className is assigned properly", () => {
        expect(getAnswerClassName({ givenAnswer: "a", correct_answer: "a" }, "a")).toBe("answer correct");
        expect(getAnswerClassName({ givenAnswer: "a", correct_answer: "b" }, "a")).toBe("answer wrong")
    })
})



