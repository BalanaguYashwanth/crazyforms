export const createOrUpdateQuestions = (data: unknown) => {
    return fetch('http://localhost:3000/question', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const fetchQuestionsByFormId = (data: {id: number}) => {
    return fetch(`http://localhost:3000/question/${data?.id}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },
    })
}

export const createAnswers = (data: unknown) => {
    return fetch('http://localhost:3000/question/answers', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const createUser = (data: unknown) => {
    return fetch('http://localhost:3000/user', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const fetchForms = () => {
    return fetch('http://localhost:3000/form', {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    })
}

export const fetchByFormIdUserId = (data: {userId: number, formId: number}) => {
    return fetch(`http://localhost:3000/question/form/${data.formId}/user/${data.userId}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    })
}

export const createForms = (data: unknown) => {
    return fetch('http://localhost:3000/form', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const updateForms = (data: {id: number, escrowId: string}) => {
    return fetch(`http://localhost:3000/form/${data.id}`, {
        method: 'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}