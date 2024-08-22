export default function DropdownData(
  json: boolean,
  data: any[],
  readIn?: any,
  activedItems = true
) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  return json
    ? activedItems
      ? data
          .filter(
            (obj) =>
              hasOwnProperty.call(obj, readIn) && obj.Situação === "Ativo"
          )
          .map((obj) => {
            return {
              id: obj.id,
              text: obj[readIn],
            };
          })
      : data
          .filter((obj) => hasOwnProperty.call(obj, readIn))
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
