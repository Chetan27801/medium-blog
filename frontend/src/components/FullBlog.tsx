import { Blog } from "../hooks";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
	return (
		<div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
			<div className="col-span-8 pr-28">
				<div className="text-5xl font-extrabold">{blog.title}</div>
				<div className="text-slate-500 pt-2">Post on 22nd June 2024</div>
				<div className="pt-4">{blog.content}</div>
			</div>
			<div className="col-span-4 ">
				<div className="text-slate-500 text-lg">Author</div>
				<div className="flex">
					<div className="pr-4 flex flex-col justify-center">
						<Avatar name={blog.author.name} size="big" />
					</div>

					<div>
						<div className="text-xl font-bold">{blog.author.name}</div>
						<div className="pt-2 text-slate-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
							perspiciatis illo itaque mollitia nulla error unde. Illum harum
							eveniet pariatur.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
