export default interface IEvents {
  onClick?: () => void;
  onChange?: (value: any) => void;
  onEdit?: (data: any) => void;
  onSelectChange?: ((selectedOption: any) => void) | undefined;
  onSelectDropItem?: (option: any[]) => void;
}
