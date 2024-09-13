import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { REDIRECTION_ROUTES } from "../../common/constants";
import { fetchAnswersByFormId, fetchQuestionsByFormId } from "../../common/api.service";
import CustomButton from "../../components/CustomButton/CustomButton";
import './Responses.scss'

const Responses = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [tableHeading, setTableHeading] = useState([]);
    const { id } = useParams();

    const matchQuestionWithAnswers = (questionArr, responseArr) => {
        const structuredAnswers = {}
        for (const question of questionArr) {
            for (const response of responseArr) {
                if (response.user.id in structuredAnswers) {
                    if (response.question.id === question.questionId) {
                        structuredAnswers[response.user.id][question.label] = response.answer
                    }
                } else {
                    if (response.question.id === question.questionId) {
                        structuredAnswers[response.user.id] = {
                            username: response.user.name,
                            email: response.user.email,
                            userId: response.user.id,
                            [question.label]: response.answer,
                        }
                    }
                }
            }
        }
        const allResponses = Object.values(structuredAnswers);
        if (allResponses.length > 0) {
            setTableHeading(Object.keys(allResponses[0]))
        }
        setResponses(allResponses);
    }

    const fetchAnswers = async (formId: number) => {
        const questionPromise = await fetchQuestionsByFormId({ id: formId })
        const questions = await questionPromise.json();
        const struturedQuestions = questions.map(question => { return { label: question.attributes.label, questionId: question.key } })

        const answerPromise = await fetchAnswersByFormId({ formId })
        const answers = await answerPromise.json();
        matchQuestionWithAnswers(struturedQuestions, answers.data);
    }

    const handlePushToWalrus = () => {
        console.log('working')
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (id && user?.id) {
            fetchAnswers(Number(id))
        } else {
            navigate(REDIRECTION_ROUTES.HOME);
        }
    }, [id, navigate])

    console.log()
    return (
        <main>
            <section className="button-stack">
                <CustomButton title="Click to push this below data to paid marketplace & Get paid" handleSubmit={handlePushToWalrus} />
                <CustomButton title="Click to push to community responses" handleSubmit={() => { }} />
            </section>

            <table>
                <thead>
                    <tr>
                        {
                            tableHeading.map((heading) => (
                                <th>{heading}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        responses.map((response) => (
                            <tr>
                                {
                                    tableHeading.map((heading) => (
                                        <td> {response[heading]} </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}

export default Responses;