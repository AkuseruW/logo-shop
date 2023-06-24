export async function fetcher<TRequest, TResponse>(url: string, method: string, data?: TRequest): Promise<TResponse> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json() as TResponse;

    if (!response.ok) {
        // @ts-ignore
        throw new Error(responseData.message || response.statusText);
    }

    return responseData;
}
