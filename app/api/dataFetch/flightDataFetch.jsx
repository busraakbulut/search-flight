const fetchFlightData = async () => {
	try {
		const response = await fetch("http://localhost:3005/flights");
		if (response.ok) {
			const data = await response.json();

			console.log(data);
		} else {
			console.error("Veri çekme başarısız oldu");
		}
	} catch (error) {
		console.error("Bir hata oluştu", error);
	}
};

export default fetchFlightData;
