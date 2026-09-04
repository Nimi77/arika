const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const newAccessToken = json?.data?.accessToken;

    if (!newAccessToken) return null;

    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch {
    return null;
  }
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<any> {
  const token = getAccessToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      return apiFetch(endpoint, options, true);
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

export function storeAuthToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
