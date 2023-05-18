import React from "react";

const Wrapper = (Component: React.FC) => () => {
	return (
		<section className="content">
			<Component />
		</section>
	);
};

export default Wrapper;
