const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const token = getAccessToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const error: any = new Error(`API error: ${res.status}`);
    error.status = res.status;
    (error as any).body = errorBody;
    throw error;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function storeAuthTokens(data: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
