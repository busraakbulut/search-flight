"use client";

import InputField from "@/components/input/Input";
import DatePicker from "@/components/datepicker/DatePicker";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import flightDataFetch from "@/app/api/dataFetch/flightDataFetch";
import airportCodesDataFetch from "@/app/api/dataFetch/airportCodesDataFetch";
import swalHelper from "@/components/toast/sweetAlert";
import TableComponent from "@/components/table/Table";
import Loading from "@/components/loading/Loading";

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
	const [flightResults, setFlightResults] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		airportCodesDataFetch().then((res) => {
			setAirportCodes(res);
		});
	}, []);

	const handleItineraryType = (e) => {
		if (e.target.value === "One-way") {
			setFormData({
				...formData,
				itineraryType: e.target.value,
				returnDate: "",
			});
		} else {
			setFormData({
				...formData,
				itineraryType: e.target.value,
				returnDate: handleReturnDateChange(returnDate),
			});
		}
	};
	const swal = swalHelper();
	const handleFormSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const result = flightDataFetch({ formData });
		const flightResults = await result;
		let promise = Promise.resolve(flightResults);
		promise.then((value) => {
			setFlightResults(value);
		});
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		swal.defaultSwal(
			"Success",
			"Flight search results are listed below.",
			"success",
			2000
		);
		if (flightResults.length === 0 || flightResults === undefined) {
			setLoading(false);
			swal.defaultSwal("Error", "No flight data", "error", 2000);
		}
	};

	const handleDateChange = (newDate) => {
		if (newDate === null || newDate === "") return;

		const endDate = new Date(formData.returnDate);
		if (endDate <= newDate) {
			swal.defaultSwal(
				"Hata",
				"Return date cannot be earlier than the departure date.",
				"error",
				2000
			);
			return;
		}

		setDate(newDate);
		const formattedDate = `${newDate.getFullYear()}-${String(
			newDate.getMonth() + 1
		).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;

		setFormData({
			...formData,
			date: formattedDate,
		});
	};

	const handleReturnDateChange = (date) => {
		if (date === null || date === "") return;

		const startDate = new Date(formData.date);
		if (date <= startDate) {
			swal.defaultSwal(
				"Hata",
				"Return date cannot be earlier than the departure date.",
				"error",
				2000
			);
			return;
		}
		setReturnDate(date);
		const formattedDate = `${date.getFullYear()}-${String(
			date.getMonth() + 1
		).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

		setFormData({
			...formData,
			returnDate: formattedDate,
		});

		return formattedDate;
	};
	return (
		<div className="  bg-gradient-to-l from-[#3586dc] to-blue-300 min-h-screen flex items-center justify-center ">
			<div className="bg-white shadow-md p-6 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-4">
				<h1 className="text-3xl font-semibold mb-4">Flight Search</h1>

				<form onSubmit={handleFormSubmit}>
					<Autocomplete
						options={airportCodes}
						aria-required={true}
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
								required={true}
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
								required={true}
							/>
						)}
					/>

					<div className="flex">
						<div className="flex-1 mr-2">
							<label className="block text-[#4173a8] text-lg font-semibold mb-2">
								Date
							</label>
							<DatePicker
								required
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
									formData.itineraryType === "One-way"
										? "opacity-50 pointer-events-none"
										: ""
								}`}
								selectedDate={
									formData.itineraryType === "One-way" ? "" : returnDate
								}
								handleDateChange={handleReturnDateChange}
								disabled={formData.itineraryType === "One-way"}
								required={formData.itineraryType !== "One-way"}
							/>
						</div>
					</div>

					<label className="block mb-1">Itinerary Type:</label>
					<select
						required
						className=" mb-4 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
						name="itineraryType"
						value={formData.itineraryType}
						onChange={handleItineraryType}>
						<option value="">Select</option>
						<option value="One-way">One Way</option>
						<option value="Round-trip">Round Trip</option>
					</select>

					<InputField
						label="Number of Adults"
						name="numAdults"
						type="number"
						value={formData.numAdults}
						required={true}
						onChange={(e) =>
							setFormData({ ...formData, numAdults: e.target.value })
						}
					/>

					<label className="block mb-1">Class of Service:</label>
					<select
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
						name="classOfService"
						value={formData.classOfService}
						required
						onChange={(e) =>
							setFormData({ ...formData, classOfService: e.target.value })
						}>
						<option value="">Select</option>
						<option value="Economy">Economy</option>
						<option value="Premium_economy">Premium Economy</option>
						<option value="Business">Business</option>
						<option value="First Class">First</option>
					</select>
					<button
						type="submit"
						className="bg-[#4173a8] text-white rounded-md px-3 py-2 mt-4">
						Search
					</button>
				</form>

				{loading ? (
					<Loading />
				) : (
					<div className="mt-4">
						{flightResults?.length > 0 && (
							<div className="bg-white shadow-md rounded-lg overflow-x-auto">
								<TableComponent data={flightResults} />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
