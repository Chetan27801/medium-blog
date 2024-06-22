import { ChangeEvent, useState } from "react";
import { Appbar } from "./../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();
	return (
		<div>
			<Appbar />
			<div className="flex justify-center pt-8">
				<div className="max-w-screen-lg w-full">
					<input
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type="text"
						placeholder="Title"
						className="my-3 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-slate-50 text-lg focus:ring-blue-500 focus:border-blue-500"
					/>
					<TextEditor
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<button
						type="submit"
						onClick={async () => {
							const response = await axios.post(
								`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
								{
									title,
									content: description,
								},
								{
									headers: {
										Authorization: localStorage.getItem("token"),
									},
								}
							);

							navigate(`/blog/${response.data.id}`);
						}}
						className="my-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
					>
						Publish post
					</button>
				</div>
			</div>
		</div>
	);
};

function TextEditor({
	onChange,
}: {
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	return (
		<div>
			<textarea
				id="message"
				onChange={onChange}
				rows={6}
				className=" block p-2.5 w-full text-sm text-gray-900 bg-slate-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
				placeholder="Write your content here..."
			/>
		</div>
	);
}
