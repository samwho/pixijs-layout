module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'jsdom',
    testRegex: '/test/index.ts$',
    moduleFileExtensions: ['ts', 'js'],
};
