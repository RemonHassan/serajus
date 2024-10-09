async function shortByPrice() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();

  const unSortedData = data.pets;
  const sortedData = unSortedData.sort((x, y) => {
    if (x.price == undefined) return 1;
    if (y.price == undefined) return 1;

    return y.price - x.price;
  });
  console.log(sortedData);
  displayPets(data.pets);
}
