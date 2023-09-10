function airportCodesDataFetch() {
	return axios
		.get("http://localhost:3004/airportCodes")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
		});
}

export default airportCodesDataFetch;
