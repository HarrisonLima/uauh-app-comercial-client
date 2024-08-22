export default function DropdownData(
  json: boolean,
  data: any[],
  readIn?: any,
  activedItems: boolean = true
) {
  
  return json
    ? activedItems
      ? data
          .filter(
            (obj) => obj.hasOwnProperty(readIn) && obj.Situação === "Ativo"
          )
          .map((obj) => {
            return {
              id: obj.id,
              text: obj[readIn],
            };
          })
      : data
          .filter((obj) => obj.hasOwnProperty(readIn))
          .map((obj) => {
            return {
              id: obj.id,
              text: obj[readIn],
            };
          })
    : data.map((option, index) => {
        return {
          id: index + 1,
          text: option,
        };
      });
}
