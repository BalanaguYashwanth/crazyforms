import { API_URL } from "./config"
import { ObjectProps } from "./types"

export const createOrUpdateQuestions = (data: unknown) => {
    return fetch(`${API_URL}/question`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const fetchQuestionsByFormId = (data: {id: number}) => {
    return fetch(`${API_URL}/question/${data?.id}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },
    })
}

export const createAnswers = (data: unknown) => {
    return fetch(`${API_URL}/question/answers`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const createUser = (data: unknown) => {
    return fetch(`${API_URL}/user`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const fetchForms = () => {
    return fetch(`${API_URL}/form`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    })
}

export const fetchFormById = (id: number) => {
    return fetch(`${API_URL}/form/${id}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    })
}

export const fetchByFormIdUserId = (data: {userId: number, formId: number}) => {
    return fetch(`${API_URL}/question/form/${data.formId}/user/${data.userId}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    })
}

export const createForms = (data: unknown) => {
    return fetch(`${API_URL}/form`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export const updateForms = (data: ObjectProps) => {
    return fetch(`${API_URL}/form/${data.id}`, {
        method: 'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}