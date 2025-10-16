import axios from "axios";

export const getFrete = async (zipcode: string) => {
  zipcode = zipcode.replace('-','');
  if (!zipcode.match(/^\d{8}$/)) return null;
  let api = process.env.API_FRETE || 'https://brasilapi.com.br/api/cep/v1/{cep}'
  api = api.replace('{cep}', zipcode);
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (ex) {}
  return null;
}