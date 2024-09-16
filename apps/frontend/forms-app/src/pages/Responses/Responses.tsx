import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { REDIRECTION_ROUTES } from "../../common/constants";
import { fetchAnswersByFormId, fetchQuestionsByFormId, publisherWalrus } from "../../common/api.service";
import CustomButton from "../../components/CustomButton/CustomButton";
import './Responses.scss'

const Responses = () => {
    const [apiUrl, setApiUrl] = useState('');
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
        localStorage.setItem('responses', JSON.stringify(allResponses));
        setResponses(allResponses);
    }

    const fetchAnswers = async (formId: number) => {
        try {
            toast.loading('Fetching details')
            const questionPromise = await fetchQuestionsByFormId({ id: formId })
            const questions = await questionPromise.json();
            const struturedQuestions = questions.map(question => { return { label: question.attributes.label, questionId: question.key } })

            const answerPromise = await fetchAnswersByFormId({ formId })
            const answers = await answerPromise.json();
            matchQuestionWithAnswers(struturedQuestions, answers.data);
            toast.dismiss();
            toast.success('Loaded Responses')
        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Error occured ${err}`)
            }
        }

    }

    const redirectVoting = () => {
        navigate('/'+REDIRECTION_ROUTES.VOTING)
    }

    const getOnlineUrl = async () => {
        try{
            toast.loading('Generating');
            const promise = await publisherWalrus(responses);
            const data = await promise.json();
            if(data?.newlyCreated?.blobObject?.blobId){
                setApiUrl(data?.newlyCreated?.blobObject?.blobId)
            }else{
                setApiUrl(data?.alreadyCertified?.blobId)
            }
            toast.dismiss()
        } catch(err){
            toast.dismiss()
            toast.error('Please try after sometime')
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (id && user?.id) {
            fetchAnswers(Number(id))
        } else {
            navigate(REDIRECTION_ROUTES.HOME);
        }
    }, [id, navigate])

    return (
        <main>
            <Toaster />
            <section className="center-header">
                <h1></h1>
                <h1>Responses</h1>
                <article className="button-stack">
                    <CustomButton title="Click to push to community voting" handleSubmit={redirectVoting} />
                    <CustomButton title="Click to use API or download data " handleSubmit={getOnlineUrl} />
                    {apiUrl && <p><a href={`https://aggregator-devnet.walrus.space/v1/${apiUrl}`} target="_blank">Generated link</a></p>}
                    <CustomButton title="AI summarizer" handleSubmit={() => { }} />
                </article>
            </section>
            <table>
                <thead>
                    <tr>
                        {
                            tableHeading.map((heading, index) => (
                                <th key={`heading-${index}`}>{heading}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        responses.map((response) => (
                            <tr>
                                {
                                    tableHeading.map((heading, index) => (
                                        <td key={`responses-${index}`}> {response[heading]} </td>
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