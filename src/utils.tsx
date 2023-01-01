export function createUrls(carId: string) {
  const imageUrl = `/images/${carId.replaceAll("-", "_")}.jpg`;
  const learnUrl = `/learn/${carId}`;
  const shopUrl = `/shop/${carId}`;

  return { imageUrl, learnUrl, shopUrl };
}
