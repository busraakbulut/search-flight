const fetchFlightData = async (formData) => {
	try {
		const response = await fetch("http://localhost:3005/flights", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			const filteredData = [];
			let isFilterData = false;

			for (const key in data) {
				for (const property in formData.formData) {
					if (
						formData.formData.hasOwnProperty(property) &&
						formData.formData[property] == data[key][property]
					) {
						isFilterData = true;
					} else {
						isFilterData = false;
						break;
					}
				}
				if (isFilterData === true) {
					filteredData.push(data[key]);
				}
			}
			console.log(filteredData);
			return filteredData;
		} else {
			console.error("Veri çekme başarısız oldu");
		}
	} catch (error) {
		console.error("Bir hata oluştu", error);
	}
};

export default fetchFlightData;
