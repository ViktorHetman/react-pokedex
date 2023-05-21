import React from "react";
import { FaPlus } from "react-icons/fa";

import { UserPokemonType } from "../models/types";

const CompareContainer = ({
	pokemon = undefined,
	isEmpty = false,
}: {
	pokemon?: UserPokemonType;
	isEmpty?: boolean;
}) => {
	return (
		<div className="compare-container">
			{isEmpty && (
				<div className="empty">
					<button>
						<FaPlus />
					</button>
					<h3>Add pokemon to comparison</h3>
				</div>
			)}
		</div>
	);
};

export default CompareContainer;
