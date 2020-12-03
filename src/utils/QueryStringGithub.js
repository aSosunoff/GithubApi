export class QueryStringGithub {
	filter = {};

	constructor(filter) {
		this.filter = filter;
	}

	login(login) {
		return `${encodeURIComponent(login)} in:login`;
	}

	toString() {
		return Object.entries(this.filter)
			.reduce((acc, [name, value]) => {
				if (name in this) {
					acc.push(this[name](value));
				}

				return acc;
			}, [])
			.join(" AND ");
	}
}
