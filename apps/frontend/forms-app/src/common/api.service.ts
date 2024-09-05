export const createQuestions = (data: unknown) => {
    return fetch('http://localhost:3000/question', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const fetchQuestionsByFormId = (data: unknown) => {
    return fetch(`http://localhost:3000/question/id=${data?.id}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },
    })
}