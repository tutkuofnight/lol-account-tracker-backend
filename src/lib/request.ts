import { riotApiKey } from './veriables';

// Custom fetch wrapper with timeout and interceptors
const api = async (url: string, options: RequestInit = {}): Promise<any> => {
  // Request interceptor
  const headers = {
    'X-Riot-Token': riotApiKey,
    'Content-Type': 'application/x-www-form-urlencoded',
    ...options.headers,
  };

  console.log('İstek gönderiliyor:', url);

  // Timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      // @ts-ignore
      headers,
      signal: controller.signal,
    });

    // Response interceptor
    console.log('Yanıt alındı:', response.status);

    return { data: await response.json(), status: response.status };
  } finally {
    clearTimeout(timeoutId);
  }
};

export default api;
