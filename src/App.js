import './App.css';

import {useState, useEffect} from 'react';

const useLocalState = (key, initial) => {
	const [value, setValue] = useState(() => {
		if (typeof window !== undefined) {
			const saved = window.localStorage.getItem(key);
			if (saved !== null) {
				return JSON.parse(saved);
			}
		}
		return initial;
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

function App() {
	const [value, setValue] = useLocalState('word', '');

	return (
		<div className="App">
			<div style={{display: 'block'}}>
				<label>Alguna frase</label>
				<input
					type="text"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default App;
