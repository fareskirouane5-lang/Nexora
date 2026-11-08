export type ApiClientOptions = {
  baseUrl?: string
  fetcher?: typeof fetch
}

export type ApiResponse<T> = {
  data: T
  status: number
}

/** Typed seam for the future FastAPI integration. No endpoints are assumed yet. */
export class NexoraApiClient {
  private readonly baseUrl: string
  private readonly fetcher: typeof fetch

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? ''
    this.fetcher = options.fetcher ?? fetch
  }

  async request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const response = await this.fetcher(`${this.baseUrl}${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    })
    return { data: (await response.json()) as T, status: response.status }
  }
}
