export const MIN_VELOCITY = 10;
export const MAX_VELOCITY = 50;

export const MAX_DISTANCE = 400;

export const calculateVelocity = (distance: number) => {
    const scale = (MAX_VELOCITY) / Math.log(MAX_DISTANCE);
    return Math.max(MIN_VELOCITY, Math.log(Math.min(distance + 1, MAX_DISTANCE)) * scale);
}