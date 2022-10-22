declare interface WebAPI {
  key?: string,
  name: string,
  path?: string,
  available: boolean | undefined,
  secureContext?: boolean,
  webworker?: boolean,
  experimental?: boolean,
  source?: string,
  links?: {
    name: string,
    url: string,
  }[],
}
