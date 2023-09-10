import * as Yup from "yup";

export const flightSchema = Yup.object().shape({
	date: Yup.string().required("Date is required"),
	itineraryType: Yup.string().required("Itinerary type is required"),
	numAdults: Yup.number().required("Number of adults is required"),
	classOfService: Yup.string().required("Class of service is required"),
});
