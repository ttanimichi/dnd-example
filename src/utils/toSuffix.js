export default function toSuffix(level) {
  let suffix = "";

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
