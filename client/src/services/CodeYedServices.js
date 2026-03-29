const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const handleRes = async (res) => {
	const text = await res.text();
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export const register = async ({ email, password, name }) => {
	const res = await fetch(`${API}/api/users/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	});
	return handleRes(res);
};

export const login = async ({ email, password }) => {
	const res = await fetch(`${API}/api/users/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	return handleRes(res);
};

const authHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export const getNews = async (token) => {
	const res = await fetch(`${API}/api/news`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const getNewsById = async (id, token) => {
	const res = await fetch(`${API}/api/news/${id}`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const createNews = async (data, token) => {
	const res = await fetch(`${API}/api/news`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const updateNews = async (id, data, token) => {
	const res = await fetch(`${API}/api/news/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const deleteNews = async (id, token) => {
	const res = await fetch(`${API}/api/news/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	});
	return handleRes(res);
};

export const getVideos = async (token) => {
	const res = await fetch(`${API}/api/videos`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const getVideoById = async (id, token) => {
	const res = await fetch(`${API}/api/videos/${id}`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const createVideo = async (data, token) => {
	const res = await fetch(`${API}/api/videos`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const updateVideo = async (id, data, token) => {
	const res = await fetch(`${API}/api/videos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const deleteVideo = async (id, token) => {
	const res = await fetch(`${API}/api/videos/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	});
	return handleRes(res);
};

export const getResources = async (token) => {
	const res = await fetch(`${API}/api/resources`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const getResourceById = async (id, token) => {
	const res = await fetch(`${API}/api/resources/${id}`, { headers: authHeaders(token) });
	return handleRes(res);
};

export const createResource = async (data, token) => {
	const res = await fetch(`${API}/api/resources`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const updateResource = async (id, data, token) => {
	const res = await fetch(`${API}/api/resources/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	});
	return handleRes(res);
};

export const deleteResource = async (id, token) => {
	const res = await fetch(`${API}/api/resources/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	});
	return handleRes(res);
};

// los servicios