export default function toSuffix(level: number): string {
  let suffix: string = "";

  switch (level) {
    case 0:
      break;
    case 1:
      suffix = "グループ";
      break;
    case 2:
      suffix = "ユニット";
      break;
    default:
      suffix = "チーム";
  }

  return suffix;
}
