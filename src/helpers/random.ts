const random = (min: number, max: number): number => min + Math.round(Math.random() * (max - min));

export default random;