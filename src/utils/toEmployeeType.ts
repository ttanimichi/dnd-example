export default function toEmployeeType(type: string): string {
  switch (type) {
    case "mid_career":
      return "中途採用";
    case "new_graduate":
      return "新卒採用";
    case "handicapped":
      return "障害者採用";
    default:
      return "中途採用";
  }
}
