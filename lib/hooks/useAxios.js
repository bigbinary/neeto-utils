import { useState } from "react";
import axios from "axios";

export const useAxios = initialValue => {
	const [apiResponse, setApiResponse] = useState(initialValue);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	return {
		apiResponse,
		loading,
		error,
		request: async params => {
			setLoading(true);
			try {
				const response = await axios.request(params);
				setApiResponse(response);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
	};
};
