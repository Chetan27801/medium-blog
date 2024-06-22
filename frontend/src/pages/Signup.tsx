import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2">
			<div className="flex justify-center items-center h-screen">
				<Auth type="signup" />
			</div>
			<div className="lg:block hidden">
				<Quote />
			</div>
		</div>
	);
};
