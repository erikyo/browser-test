/**
 * Determines the result color based on the score.
 *
 * @param {number} score - The score to evaluate.
 * @return {string} The color code representing the result.
 */
export const resultColor = (score: number): string => {
    if (score < 25) {
        return '#ff032f'
    } else if (score < 50) {
        return '#ff6c03'
    } else if (score < 75) {
        return '#ffc403'
    } else {
        return '#2fd504'
    }
};
