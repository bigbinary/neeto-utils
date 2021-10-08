import React, { useEffect, useRef, useState } from "react";
// import { Slugify } from "/bundle/main";
import BasicTemplate from "./components/BasicTemplate";
import { Slugify } from "../../lib/utils";
import { useAxios, useDebounce, useOnClickOutside } from "../../lib/hooks";

const App = () => {
	const buttonRef = useRef();
	const [useDebounceValue, setUseDebounceValue] = useState("");

	useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));
	const debouncedValue = useDebounce(useDebounceValue, 2000);

	const {
		request: getPosts,
		apiResponse: { data: todos },
		error: todosError,
		loading: todosLoading,
	} = useAxios([]);

	const {
		request: createPost,
		apiResponse: { data: id },
		error: createError,
		loading: createLoading,
	} = useAxios("");

	const handleSubmit = () => {
		createPost({
			method: "POST",
			url: "https://jsonplaceholder.typicode.com/posts",
		});
	};

	useEffect(() => {
		if (debouncedValue) {
			console.log(debouncedValue);
			setUseDebounceValue("");
		}
	}, [debouncedValue]);

	return (
		<div>
			<h1>Neeto Utils</h1>
			<BasicTemplate
				title="Slugify"
				input="This is Neeto Utils"
				output={Slugify("This is Neeto Utils")}
			/>
			<BasicTemplate
				title="useOnClickOutside"
				input={<button ref={buttonRef}>Click outside</button>}
				output="Check console"
			/>
			<BasicTemplate
				title="useDebounce"
				input={
					<button
						onClick={() => setUseDebounceValue("Debounced after 2 seconds")}
					>
						Click for debounce
					</button>
				}
				output="Check console"
			/>
			<button
				onClick={() =>
					getPosts({
						method: "GET",
						url: "https://jsonplaceholder.typicode.com/posts",
					})
				}
				style={{
					marginRight: "16px",
				}}
			>
				GET
			</button>
			<button onClick={() => handleSubmit()}>POST</button>
			<div>
				<h1>Posts - GET</h1>

				{todosLoading ? (
					<p>loading...</p>
				) : (
					<div>
						{todosError && (
							<div>
								<p>{todosError.message}</p>
							</div>
						)}
						<div>
							{todos && todos.map(todo => <h3 key={todo.id}>{todo.title}</h3>)}
						</div>
					</div>
				)}
			</div>
			<div>
				{createLoading ? <p>Loading...</p> : <p>{JSON.stringify(id)}</p>}
				{createError && <p>createError</p>}
			</div>
		</div>
	);
};

export default App;
