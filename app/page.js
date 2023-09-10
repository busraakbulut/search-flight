"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { flightSchema } from "@/validationSchema/flightSchema";
import InputField from "@/components/input/Input";
import DatePicker from "@/components/datePicker/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import airportCodesDataFetch from "@/app/api/dataFetch/airportCodesDataFetch";
import fetchFlightData from "./api/dataFetch/flightDataFetch";

const Page = () => {
	const [airportCodes, setAirportCodes] = useState([]);
	const [sourceAirportCode, setSourceAirportCode] = useState(null);
	const [destinationAirportCode, setDestinationAirportCode] = useState(null);

	useEffect(() => {
		airportCodesDataFetch().then((res) => {
			setAirportCodes(res);
		});
	}, []);
	useEffect(() => {
		fetchFlightData(
			sourceAirportCode,
			destinationAirportCode,
			date,
			returnDate,
			itineraryType,
			numAdults,

			classOfService
		).then((res) => {
			console.log(res);
		});
	}, [sourceAirportCode, destinationAirportCode]);

	const formik = useFormik({
		initialValues: {
			sourceAirportCode: "",
			destinationAirportCode: "",
			date: "",
			itineraryType: "",
			sortOrder: "",
			numAdults: "",
			numSeniors: "",
			classOfService: "",
		},
		validationSchema: flightSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [date, setDate] = useState(new Date());
	const [returnDate, setReturnDate] = useState(new Date());

	const handleDateChange = (date) => {
		setDate(date);
	};

	const handleReturnDateChange = (date) => {
		setReturnDate(date);
	};

	const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
		formik;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-md p-6 rounded-lg w-full md:w-1/2 lg:w-1/3">
				<form onSubmit={handleSubmit}>
					<Autocomplete
						options={airportCodes}
						onChange={(event, newValue) => {
							if (newValue) {
								let selectedId = newValue.code;
								setSourceAirportCode(selectedId);
							}
						}}
						value={
							airportCodes.find(
								(option) => option.code === sourceAirportCode
							) || null
						}
						getOptionLabel={(option) => `${option.name} (${option.code})`}
						renderInput={(params) => (
							<InputField
								type="text"
								{...params}
								label="Source Airport"
								id="sourceAirportCode"
								name="sourceAirportCode"
								placeholder="Source Airport"
								value={sourceAirportCode}
							/>
						)}
					/>
					{touched.sourceAirportCode && errors.sourceAirportCode && (
						<div className="text-red-600">{errors.sourceAirportCode}</div>
					)}
					<Autocomplete
						options={airportCodes}
						onChange={(event, newValue) => {
							if (newValue) {
								let selectedId = newValue.code;
								setDestinationAirportCode(selectedId);
							}
						}}
						value={
							airportCodes.find(
								(option) => option.code === destinationAirportCode
							) || null
						}
						getOptionLabel={(option) => `${option.name} (${option.code})`}
						renderInput={(params) => (
							<InputField
								type="text"
								{...params}
								label="Destination Airport"
								id="destinationAirportCode"
								name="destinationAirportCode"
								placeholder="Destination Airport"
								value={destinationAirportCode}
							/>
						)}
					/>
					{touched.destinationAirportCode && errors.destinationAirportCode && (
						<div className="text-red-600">{errors.destinationAirportCode}</div>
					)}

					<div className="flex mb-4">
						<div className="flex-1 mr-2">
							<label className="block text-[#4173a8] text-lg font-semibold mb-2">
								Date
							</label>
							<DatePicker
								className="border border-[#4173a8] rounded-md p-2 w-full"
								selectedDate={date}
								handleDateChange={handleDateChange}
							/>
						</div>

						<div className="flex-1 ml-2">
							<label className="block text-[#4173a8] text-lg font-semibold mb-2">
								Return Date
							</label>
							<DatePicker
								className={`border border-[#4173a8] rounded-md p-2 w-full ${
									values.itineraryType === "oneway"
										? "opacity-50 pointer-events-none"
										: ""
								}`}
								selectedDate={returnDate}
								handleDateChange={handleReturnDateChange}
								disabled={values.itineraryType === "oneway"}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block mb-1">Itinerary Type:</label>
						<select
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
							name="itineraryType"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.itineraryType}>
							<option>Select</option>
							<option value="oneway">One Way</option>
							<option value="roundtrip">Round Trip</option>
						</select>
						{touched.itineraryType && errors.itineraryType && (
							<div className="text-red-600">{errors.itineraryType}</div>
						)}
					</div>
					<InputField
						label="Number of Adults"
						id="numAdults"
						name="numAdults"
						type="number"
						placeholder="Number of Adults"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.numAdults}
						error={touched.numAdults && errors.numAdults ? true : false}
						helperText={touched.numAdults && errors.numAdults}
					/>
					<div className="mb-4">
						<label className="block mb-1">Class of Service:</label>
						<select
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
							name="classOfService"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.classOfService}>
							<option>Select</option>
							<option value="economy">Economy</option>
							<option value="premium_economy">Premium Economy</option>
							<option value="business">Business</option>
							<option value="first">First</option>
						</select>
						{touched.classOfService && errors.classOfService && (
							<div className="text-red-600">{errors.classOfService}</div>
						)}
					</div>
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-[#4173a8] text-white px-4 py-2 rounded-md">
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default Page;
