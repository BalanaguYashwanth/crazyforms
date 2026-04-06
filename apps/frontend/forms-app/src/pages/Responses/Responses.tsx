import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { REDIRECTION_ROUTES } from "../../common/constants";
import { fetchAnswersByFormId, fetchQuestionsByFormId, publisherWalrus } from "../../common/api.service";
import { QuestionArrProps, ResponseArrProps, TabData } from "../../common/types";
import TableView from "../../components/TableView/TableView";
import TabView from "../../components/TabView/TabView";
import ChatView from "../../components/ChatView/ChatView";
import './Responses.scss';

const Responses = () => {
    const [apiUrl, setApiUrl] = useState<string>('');
    const navigate = useNavigate();
    const [responses, setResponses] = useState<Record<string, any>[]>([]);
    const [tableHeading, setTableHeading] = useState<string[]>([]);
    const { id } = useParams<{ id: string }>();

    const matchQuestionWithAnswers = (
        questionArr: QuestionArrProps[],
        responseArr: ResponseArrProps[]
    ): void => {
        const structuredAnswers: Record<string, Record<string, any>> = {};

        questionArr.forEach((question) => {
            responseArr.forEach((response) => {
                const userId = response.user.id;
                const isExistingUser = userId in structuredAnswers;

                if (response.question.id === question.questionId) {
                    if (isExistingUser) {
                        structuredAnswers[userId][question.label] = response.answer;
                    } else {
                        structuredAnswers[userId] = {
                            username: response.user.name,
                            email: response.user.email,
                            [question.label]: response.answer,
                        };
                    }
                }
            });
        });

        const allResponses = Object.values(structuredAnswers);
        if (allResponses.length > 0) {
            setTableHeading(Object.keys(allResponses[0]));
        }
        localStorage.setItem('responses', JSON.stringify(allResponses));
        setResponses(allResponses);
    };

    const fetchAnswers = async (formId: number): Promise<void> => {
        try {
            toast.loading('Fetching details');
            const questionPromise = await fetchQuestionsByFormId({ id: formId });
            const questions = await questionPromise.json();
            const structuredQuestions: QuestionArrProps[] = questions.map((question: any) => ({
                label: question.attributes.label,
                questionId: question.key,
            }));

            const answerPromise = await fetchAnswersByFormId({ formId });
            const answers = await answerPromise.json();
            matchQuestionWithAnswers(structuredQuestions, answers.data);
            toast.dismiss();
            toast.success('Loaded Responses');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Error occurred: ${err.message}`);
            }
        }
    };

    const redirectVoting = (): void => {
        navigate(`/${REDIRECTION_ROUTES.VOTING}`);
    };

    const getOnlineUrl = async (): Promise<void> => {
        try {
            toast.loading('Generating');
            const promise = await publisherWalrus(responses);
            const data = await promise.json();
            const blobId = data?.newlyCreated?.blobObject?.blobId || data?.alreadyCertified?.blobId;

            if (blobId) {
                setApiUrl(blobId);
            }
            toast.dismiss();
        } catch (err) {
            toast.dismiss();
            toast.error('Please try again later');
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (id && user?.id) {
            fetchAnswers(Number(id));
        } else {
            navigate(REDIRECTION_ROUTES.HOME);
        }
    }, [id, navigate]);

    const tabJson: TabData[] = [
        {
            id: 1,
            header: 'View',
            component: <TableView heading={tableHeading} data={responses} />,
        },
        {
            id: 2,
            header: 'AI Insights',
            component: <ChatView data={responses} />,
        },
    ];

    return (
        <main>
            <Toaster />
            <section className="center-header">
                <h1 className="spacing">Responses</h1>
                <article className="button-stack">
                    {/* <CustomButton title="Click to push to community voting" handleSubmit={redirectVoting} /> */}
                    {/* <CustomButton title="Click to use API or download data" handleSubmit={getOnlineUrl} /> */}
                    {/* {apiUrl && <p><a href={`https://aggregator-devnet.walrus.space/v1/${apiUrl}`} target="_blank" rel="noopener noreferrer">Generated link</a></p>} */}
                    {/* <CustomButton title="AI summarizer" handleSubmit={() => { }} /> */}
                </article>
            </section>
            <TabView data={tabJson} />
        </main>
    );
};

export default Responses;