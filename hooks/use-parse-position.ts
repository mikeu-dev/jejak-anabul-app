export const parseGeoToNumber = (geoStr: string) => {
    // contoh input: "6.214708371645074° S"
    const match = geoStr.match(/([\d.]+)°\s*([NSEW])/);
    if (!match) return 0;
    let [, num, dir] = match;
    let val = parseFloat(num);
    if (dir === "S" || dir === "W") val = -val;
    return val;
};
