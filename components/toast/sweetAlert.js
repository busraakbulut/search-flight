import Swal from "sweetalert2";

const swalHelper = () => {
	const defaultSwal = (title, text, icon, timer) => {
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			timer: timer,
		});
	};

	const yesNoSwal = ({ title, text, icon }) => {
		return Swal.fire({
			title: title,
			text: text,
			icon: icon,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
		});
	};

	return {
		defaultSwal,
		yesNoSwal,
	};
};

export default swalHelper;
