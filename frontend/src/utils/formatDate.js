export default function formatDate(value) {
  return Intl.DateTimeFormat("pt-br").format(value);
}
