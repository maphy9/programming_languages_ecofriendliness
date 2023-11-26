"use strict";

const fs = require("fs");

const pathes = [
	"./data1.csv",
	"./data2.csv",
	"./data3.csv",
]

const getAvg = (data) => {
	const newData = new Map();

	for(const field of data) {
		const [language, value] = field;

		const avr = value.reduce((acc, val) => acc + val) / value.length;

		newData.set(language, avr);
	}

	return newData;
}

const getData = (pathes) => {
	const data = new Map();

	for (const path of pathes) {
		const lines = fs.readFileSync(path, "utf8").split("\n");
		lines.pop();

		for (const line of lines) {
			const [language, value] = line.split(",");
			
			if (!data.has(language)) {
				data.set(language, [parseFloat(value)])
			} else {
				data.set(language, [...data.get(language), parseFloat(value)]);
			}
		}
	}
	
	return getAvg(data);
}

const sort = (data) => {
	return new Map([...data].sort((a, b) => a[1] > b[1] ? 1 : -1));
}

const writeData = (data, path) => {
	let content = "";
	for (const key of data.keys()) {
		content += key + ',' + data.get(key) + '\n';
	}

	fs.writeFile(path, content, err => {
		if (err)
			console.log(err);
	});
}

const data = sort(getData(pathes));
writeData(data, "./result.csv");
