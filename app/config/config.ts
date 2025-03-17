interface IEnv {
  BASE_URL: string;
}
const prefix = "/api/v1"
export const env = {
  BASE_URL:"https://659f86b15023b02bfe89c737.mockapi.io" + prefix,
} as unknown as IEnv;