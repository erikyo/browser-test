function Score(props : {score: string}) {
    return props.score ? <p className="text-2xl font-bold text-center score">Test Failed: {(100 - props.score).toFixed(2)}%</p> : null;
}

export default Score
