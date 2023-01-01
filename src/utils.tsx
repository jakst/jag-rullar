export function createUrls(carId: string) {
  const learnUrl = `/learn/${carId}`;
  const shopUrl = `/shop/${carId}`;

  return { learnUrl, shopUrl };
}
