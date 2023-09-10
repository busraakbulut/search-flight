import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerComponent = ({
	selectedDate,
	handleDateChange,
	className,
	disabled,
	...props
}) => {
	const today = new Date();
	return (
		<DatePicker
			selected={selectedDate}
			onChange={handleDateChange}
			dateFormat="dd/MM/yyyy"
			minDate={today}
			className={className}
			popperPlacement="right-start"
			popperModifiers={{
				preventOverflow: {
					enabled: true,
					escapeWithReference: false,
					boundariesElement: "viewport",
				},
			}}
			disabled={disabled}
			{...props}></DatePicker>
	);
};

export default DatepickerComponent;
