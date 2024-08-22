import Connection from "../../connection";
import useLocalStorage from "../../../storage/LocalStorage";

export default async function getData(object: string, id?: number | string) {
  const { GET_LocalStorage } = useLocalStorage();

  const token = GET_LocalStorage("Token JWT");
  try {
    if (token) {
      const connection = await fetch(
        `${Connection()}${object}${id ? `/${id}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      );
      const data = await connection.json();
      return data;
    }
  } catch (error) {
    throw new Error(`Erro na requisição: ${error}`);
    throw error;
  }
}
