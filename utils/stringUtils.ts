export function capitalizeFirstLetter(str: string = "") {
  return str?.toLowerCase().charAt(0).toUpperCase() + str?.slice(1) || "";
}