import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2">
			<div className="flex justify-center items-center h-screen">
				<Auth type="signin"/>
			</div>
			<div className="lg:block hidden">
				<Quote />
			</div>
		</div>
	);
};
