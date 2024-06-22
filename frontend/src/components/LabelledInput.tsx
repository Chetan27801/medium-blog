import { ChangeEvent } from "react";

interface LabelledInputType {
	label: string;
	placeholder: string;
	type?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({
	label,
	placeholder,
	type,
	onChange,
}: LabelledInputType) {
	return (
		<div>
			<label className="block mb-3 text-sm font-bold text-gray-900">
				{label}
			</label>
			<input
				onChange={onChange}
				type={type || "text"}
				id="first_name"
				className="mb-3 bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
