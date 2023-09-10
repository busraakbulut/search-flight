"use client";

import InputField from "@/components/input/Input";
import DatePicker from "@/components/datepicker/DatePicker";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import flightDataFetch from "@/app/api/dataFetch/flightDataFetch";
import airportCodesDataFetch from "@/app/api/dataFetch/airportCodesDataFetch";

const page = () => {
	const [formData, setFormData] = useState({
		sourceAirportCode: "",
		destinationAirportCode: "",
		date: "",
		itineraryType: "",
		numAdults: "",
		classOfService: "",
		returnDate: "",
	});
	const [date, setDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [airportCodes, setAirportCodes] = useState([]);
	const [sourceAirportCode, setSourceAirportCode] = useState(null);
	const [destinationAirportCode, setDestinationAirportCode] = useState(null);

	useEffect(() => {
		airportCodesDataFetch().then((res) => {
			setAirportCodes(res);
		});
	}, []);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		flightDataFetch({ formData });
		console.log(formData);
	};

	const handleDateChange = (newDate) => {
		setDate(newDate);
		const formattedDate = `${newDate.getFullYear()}-${String(
			newDate.getMonth() + 1
		).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;

		setFormData({
			...formData,
			date: formattedDate,
		});
		console.log(formattedDate);
	};

	const handleReturnDateChange = (date) => {
		setReturnDate(date);
		const formattedDate = `${date.getFullYear()}-${String(
			date.getMonth() + 1
		).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

		setFormData({
			...formData,
			returnDate: formattedDate,
		});
		console.log(formattedDate);
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-md p-6 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-4">
				<h1>Flight Search</h1>
				<form onSubmit={handleFormSubmit}>
					<Autocomplete
						options={airportCodes}
						onChange={(event, newValue) => {
							if (newValue) {
								let selectedId = newValue.code;
								setSourceAirportCode(selectedId);
								setFormData({
									...formData,
									sourceAirportCode: selectedId,
								});
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

					<Autocomplete
						options={airportCodes}
						onChange={(event, newValue) => {
							if (newValue) {
								let selectedId = newValue.code;
								setDestinationAirportCode(selectedId);
								setFormData({
									...formData,
									destinationAirportCode: selectedId,
								});
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
							/>
						)}
					/>

					<div className="flex">
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
									formData.itineraryType === "oneway"
										? "opacity-50 pointer-events-none"
										: ""
								}`}
								selectedDate={returnDate}
								handleDateChange={handleReturnDateChange}
								disabled={formData.itineraryType === "oneway"}
							/>
						</div>
					</div>

					<label className="block mb-1">Itinerary Type:</label>
					<select
						className=" mb-4 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
						name="itineraryType"
						value={formData.itineraryType}
						onChange={(e) =>
							setFormData({ ...formData, itineraryType: e.target.value })
						}>
						<option>Select</option>
						<option value="oneway">One Way</option>
						<option value="roundtrip">Round Trip</option>
					</select>

					<InputField
						label="Number of Adults"
						name="numAdults"
						type="number"
						value={formData.numAdults}
						onChange={(e) =>
							setFormData({ ...formData, numAdults: e.target.value })
						}
					/>

					<label className="block mb-1">Class of Service:</label>
					<select
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
						name="classOfService"
						value={formData.classOfService}
						onChange={(e) =>
							setFormData({ ...formData, classOfService: e.target.value })
						}>
						<option>Select</option>
						<option value="economy">Economy</option>
						<option value="premium_economy">Premium Economy</option>
						<option value="business">Business</option>
						<option value="first">First</option>
					</select>
					<button
						type="submit"
						className="bg-[#4173a8] text-white rounded-md px-3 py-2 mt-4">
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default page;
