import { useState } from "react";

export function useLocalStorage(key: string, initialValue: string | number | object) {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setStoredValue = (val: string | number | object) => {
		const valueToStore = val instanceof Function ? val(value) : val;
		setValue(valueToStore);
		localStorage.setItem(key, JSON.stringify(valueToStore));
	};

	return [value, setStoredValue];
}
