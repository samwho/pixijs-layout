module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'jsdom',
    testRegex: '/tests.ts$',
    moduleFileExtensions: ['ts', 'js'],
};
