module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest', // Трансформация TypeScript
		'^.+\\.js$': 'babel-jest', // Трансформация ES6+
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/jest/__mocks__/fileMock.js',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	globals: {
		fetch: global.fetch,
	},
};
