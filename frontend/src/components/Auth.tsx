import { SignupInput } from "@chejos/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
	const [postInputs, setPostInputs] = useState<SignupInput>({
		name: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const sendRequest = async () => {
		try {
			const response = await axios.post(
				`${BACKEND_URL}/api/v1/user/${
					type === "signin" ? "signin" : "signup"
				}`,
				postInputs
			);
			const jwt = response.data.jwt;
			// console.log(jwt);
			const val = "Bearer " + jwt;
			localStorage.setItem("token", val);
			navigate("/blogs");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="text-4xl font-bold px-10">Create an Account</div>
			<div className="flex text-slate-500 font-semibold px-10">
				<div className="text-md p-2 ml-4">
					{type === "signin"
						? "Don't have an account?"
						: "Already have an account?"}
				</div>
				<div className="mt-2">
					<Link
						to={type === "signin" ? "/signup" : "/signin"}
						className="underline"
					>
						{type === "signin" ? "Signup" : "Signin"}
					</Link>
				</div>
			</div>
			<div className="flex flex-col">
				{type === "signup" ? (
					<LabelledInput
						label="Name"
						placeholder="Enter your name"
						onChange={(e) => {
							setPostInputs({
								...postInputs,
								name: e.target.value,
							});
						}}
					/>
				) : null}
				<LabelledInput
					label="Email"
					placeholder="Enter your email"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							email: e.target.value,
						});
					}}
				/>
				<LabelledInput
					label="Password"
					type={"password"}
					placeholder="Enter your password"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							password: e.target.value,
						});
					}}
				/>
			</div>
			<button
				type="button"
				onClick={sendRequest}
				className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
			>
				{type === "signup" ? "Sign up" : "Sign in"}
			</button>
		</div>
	);
};
