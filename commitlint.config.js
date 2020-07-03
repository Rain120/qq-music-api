/*
 * @Author: Rainy
 * @Date: 2020-07-03 18:47:30
 * @LastEditors: Rainy
 * @LastEditTime: 2020-07-03 18:51:11
 */

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert', 'config'],
		],
		'subject-full-stop': [0, 'never'],
		'subject-case': [0, 'never'],
		'header-max-length': [0, 'always', 150],
	},
};
