const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const newAccessToken = json?.data?.accessToken;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export async function apiFetch(
  endpoint: string,
  options?: RequestInit,
  isRetry = false,
): Promise<any> {
  const token = getAccessToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return apiFetch(endpoint, options, true); // retry once with the new token
    }
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const error: any = new Error(`API error: ${res.status}`);
    error.status = res.status;
    error.body = errorBody;
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
