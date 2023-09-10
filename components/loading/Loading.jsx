import React from "react";
import loadingImage from "@/public/Spinner/giphy2.gif";
import Image from "next/image";

const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Image
				src={loadingImage}
				alt="Loading"
				className=" rounded-3xl w-28 h-28"
			/>
		</div>
	);
};

export default Loading;
