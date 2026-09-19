const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiError = Error & {
  status?: number;
  statusText?: string;
  body?: {
    message?: string | { message?: string };
    data?: Record<string, unknown>;
  } | null;
};

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

    const json = (await res.json()) as { data?: { accessToken?: string } };
    const newAccessToken = json?.data?.accessToken;

    if (!newAccessToken) return null;

    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch {
    return null;
  }
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      return apiFetch<T>(endpoint, options, true);
    }
  }

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => null)) as {
      message?: string | { message?: string };
      data?: Record<string, unknown>;
    } | null;

    const error = new Error(`API error: ${res.status}`) as ApiError;
    error.status = res.status;
    error.statusText = res.statusText;
    error.body = errorBody;

    throw error;
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}

export function storeAuthToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
