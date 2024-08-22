import useLocalStorage from "../../../storage/LocalStorage";
import Connection from "../../connection";

export default async function updateData(
  object: string,
  id: number | string,
  bodyData: any
) {
  const { GET_LocalStorage } = useLocalStorage();

  try {
    const token = GET_LocalStorage("Token JWT");

    if (token) {
      const response = await fetch(
        `${Connection()}${object}${id ? `/${id}` : ""}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      const responseData = response.ok;

      if (!responseData) {
        Promise.reject(
          `Erro na requisição: ${response.status} - ${response.statusText}`
        );
      }
      return responseData;
    }
  } catch (error) {
    throw new Error(`Erro na requisição: ${error}`);
    throw error;
  }
}
