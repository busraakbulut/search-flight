const fetchFlightData = async (formData) => {
	try {
		const response = await fetch("http://localhost:3005/flights", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const data = await response.json();

			// Assuming `data` is an object with flight information

			const filteredData = {};

			for (const key in data) {
				if (formData.hasOwnProperty(key) && data[key] === formData[key]) {
					filteredData[key] = data[key];
				}
			}

			console.log(filteredData);
		} else {
			console.error("Veri çekme başarısız oldu");
		}
	} catch (error) {
		console.error("Bir hata oluştu", error);
	}
};

export default fetchFlightData;
