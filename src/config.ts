export const MIN_VELOCITY = 15;
export const MAX_VELOCITY = 40;

export const calculateVelocity = (distance: number) => {
    return Math.max(MIN_VELOCITY, Math.min(distance / 4, MAX_VELOCITY));
}