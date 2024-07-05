import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://bidding2024.group11tlu.uk',
});

axiosInstance.interceptors.request.use((config) => {
	const token = JSON.parse(localStorage.getItem('currentAuthTokens') || '{}');
	if (token) {
		config.headers = config.headers || {};
		const unprotectedRoutes = ['/login', '/api/User/register'];

		if (config.url && !unprotectedRoutes.includes(config.url)) {
			config.headers.Authorization = token ? `Bearer ${token.accessToken}` : '';
		}
	}
	return config;
});

let isRefreshing = false;
let failedQueue: {resolve: (value?: unknown) => void; reject: (reason?: unknown) => void}[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const originalRequest = error.config;
		const refreshToken = JSON.parse(localStorage.getItem('currentAuthTokens') || '{}')?.refreshToken;

		if (error.response && error.response.status === 401 && refreshToken && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			return new Promise((resolve, reject) => {
				axios
					.post<{accessToken: string; refreshToken: string}>('/refresh', {refreshToken})
					.then(({data}) => {
						localStorage.setItem('currentAuthTokens', JSON.stringify(data));
						axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
						originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
						processQueue(null, data.accessToken);
						resolve(axiosInstance(originalRequest));
					})
					.catch((err) => {
						processQueue(err, null);
						localStorage.removeItem('currentAuthTokens');
						window.location.href = '/auth/login';
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
