export const calculateSecurityScore = (results) => {
    if (!results) {
        return 0;
    }
    const totalTests = Object.keys(results).length;
    const successfulTests = Object.values(results).filter(result => result === true).length;
    return successfulTests / totalTests;
}

export const roundToTwoDecimals = (value:number) => {
    const result = calculateSecurityScore(value)
    return (result * 100).toFixed(2)
}
