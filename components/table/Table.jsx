import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function TableComponent({ data }) {
	if (!data || data.length === 0) {
		return <p>Veri yok veya boş.</p>;
	}

	const columns = Object.keys(data[0]);

	return (
		<Table>
			<TableHead>
				<TableRow>
					{columns.map((column) => (
						<TableCell key={column}>{column.toUpperCase()}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row, index) => (
					<TableRow key={index}>
						{columns.map((column) => (
							<TableCell key={column}>{row[column]}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default TableComponent;
