const queryKey = ['shows'];

async function queryFn() {
	const response = await fetch('https://syntax.fm/api/shows');
	if (!response) throw new Error('Error');

	const data = await response.json();
	return data;
}

export { queryKey, queryFn };
