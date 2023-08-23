export default function toSuffix(level) {
  let suffix = "";

  switch (level) {
    case 0:
      break;
    case 1:
      suffix = "本部";
      break;
    case 2:
      suffix = "部";
      break;
    default:
      suffix = "課";
  }

  return suffix;
}
