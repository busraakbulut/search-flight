import * as Yup from "yup";

export const flightSchema = Yup.object().shape({
	sourcAirportCode: Yup.string()
		.required("Source airport code is required")
		.test(
			length,
			"Source airport code must be 3 characters",
			(val) => val.length === 3
		),
	destinationAirportCode: Yup.string()
		.required("Destination airport code is required")
		.test(
			length,
			"Destination airport code must be 3 characters",
			(val) => val.length === 3
		),
	date: Yup.string().required("Date is required"),
	itineraryType: Yup.string().required("Itinerary type is required"),
	numAdults: Yup.number().required("Number of adults is required"),
	classOfService: Yup.string().required("Class of service is required"),
});
