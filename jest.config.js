module.exports = {
	transform: {
		"^.+\\.(t|j)sx?$": "ts-jest",
	},
	testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testEnvironment: "jsdom",
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
};
