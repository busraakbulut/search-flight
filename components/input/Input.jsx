import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ children, ...props }) => {
	let defaultStyle =
		"w-full border border-gray-300 focus:outline-none focus:ring focus:border-[#4173a8] mb-4";
	return (
		<TextField
			{...props}
			className={props.className || defaultStyle}
			{...children}
		/>
	);
};

export default InputField;
