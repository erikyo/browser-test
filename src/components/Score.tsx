function Score(props : {score: string}) {
    return props.score ? <p className="align-center score">Test Passed: {props.score}%</p> : null;
}

export default Score
