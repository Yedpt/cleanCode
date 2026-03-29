const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const handleRes = async (res) => {
	const text = await res.text();
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

const parseError = (data, fallback) => {
	if (data?.message) return data.message;
	if (Array.isArray(data?.errors) && data.errors.length) {
		return data.errors[0]?.msg || fallback;
	}
	return fallback;
};

const request = async (path, options = {}, fallbackError = 'No se pudo completar la solicitud') => {
	try {
		const res = await fetch(`${API}${path}`, options);
		const data = await handleRes(res);

		if (!res.ok) {
			return { message: parseError(data, fallbackError), errors: data?.errors || null, status: res.status };
		}

		return data;
	} catch (error) {
		console.error('API request failed:', error);
		return { message: 'No se pudo conectar con el backend. Revisa que el server este levantado.', networkError: true };
	}
};

export const register = async ({ email, password, name }) => {
	return request('/api/users/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	}, 'No se pudo registrar el usuario');
};

export const login = async ({ email, password }) => {
	return request('/api/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	}, 'No se pudo iniciar sesion');
};

const authHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export const getNews = async (token) => {
	return request('/api/news', { headers: authHeaders(token) }, 'No se pudieron cargar las noticias');
};

export const getNewsById = async (id, token) => {
	return request(`/api/news/${id}`, { headers: authHeaders(token) }, 'No se pudo cargar la noticia');
};

export const createNews = async (data, token) => {
	return request('/api/news', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo crear la noticia');
};

export const updateNews = async (id, data, token) => {
	return request(`/api/news/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo actualizar la noticia');
};

export const deleteNews = async (id, token) => {
	return request(`/api/news/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	}, 'No se pudo eliminar la noticia');
};

export const getVideos = async (token) => {
	return request('/api/videos', { headers: authHeaders(token) }, 'No se pudieron cargar los videos');
};

export const getVideoById = async (id, token) => {
	return request(`/api/videos/${id}`, { headers: authHeaders(token) }, 'No se pudo cargar el video');
};

export const createVideo = async (data, token) => {
	return request('/api/videos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo crear el video');
};

export const updateVideo = async (id, data, token) => {
	return request(`/api/videos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo actualizar el video');
};

export const deleteVideo = async (id, token) => {
	return request(`/api/videos/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	}, 'No se pudo eliminar el video');
};

export const getResources = async (token) => {
	return request('/api/resources', { headers: authHeaders(token) }, 'No se pudieron cargar los recursos');
};

export const getResourceById = async (id, token) => {
	return request(`/api/resources/${id}`, { headers: authHeaders(token) }, 'No se pudo cargar el recurso');
};

export const createResource = async (data, token) => {
	return request('/api/resources', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo crear el recurso');
};

export const updateResource = async (id, data, token) => {
	return request(`/api/resources/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
		body: JSON.stringify(data),
	}, 'No se pudo actualizar el recurso');
};

export const deleteResource = async (id, token) => {
	return request(`/api/resources/${id}`, {
		method: 'DELETE',
		headers: { ...authHeaders(token) },
	}, 'No se pudo eliminar el recurso');
};

// los servicios