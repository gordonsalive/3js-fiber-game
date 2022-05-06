export default (currentAngle: number, targetAngle: number, defaultStep?: number) => {
    const step = defaultStep || 0.05;
    let result = currentAngle;
    if (targetAngle > currentAngle) {
        result += step;
        if (result > targetAngle) {
            result = targetAngle;
        }
    }
    if (targetAngle < currentAngle) {
        result -= step;
        if (result < targetAngle) {
            result = targetAngle;
        }
    }
    return result;
};
