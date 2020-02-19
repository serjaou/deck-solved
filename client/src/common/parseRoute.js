export default function(route) {
  return route.toLowerCase().replace(/ /g, '-');
}
