function Score(props : {score: string}) {
    return props.score ? <p className="text-2xl font-bold text-center score">Test Passed: {props.score}%</p> : null;
}

export default Score
