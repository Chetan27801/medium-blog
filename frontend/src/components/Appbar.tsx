import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Appbar = () => {
	return (
		<div className="border-b flex justify-between px-10 py-4">
			<Link
				to={"/blogs"}
				className="flex flex-col justify-center cursor-pointer font-bold"
			>
				Medium
			</Link>
			<div>
				<Link to={"/publish"}>
					<button 	
						type="button"
						className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
					>
						Publish
					</button>
				</Link>
				<Avatar name="Chetan" size="big" />
			</div>
		</div>
	);
};
