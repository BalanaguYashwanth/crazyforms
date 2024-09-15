import { useEffect, useState } from "react";
import './CommunityVoting.scss';

const CommunityVoting = () => {

    const [responses, setResponses] = useState([])

    useEffect(()=>{
        setResponses(JSON.parse(localStorage.getItem('responses')))
    },[]);

    return(
        <main>
            <h1 className="text-center m16">Community Voting</h1>
            <section className="voting-card-wrapper">
            <div className="flex" style={{justifyContent:"end"}}>
                <p style={{margin:'0px 5px'}}> sort </p>
                <select>
                    <option>select</option>
                    <option>highest votes</option>
                    <option>highest downvotes</option>
                </select>
            </div>
                {
                    responses.map((response, index) => (
                        <article key={index} className="voting-card">
                            {Object.entries(response).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}:</strong> {value}
                                </p>
                            ))}
                              <div className="flex">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" stroke-width="1.5" stroke="#666" fill="none" stroke-linejoin="round"></path></svg>
                                    <div style={{margin:'0px 1rem'}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" stroke-width="1.5" stroke-linejoin="round"></path></svg>
                                    </div>
                                </div>
                        </article>
                    ))
                }
            </section>
          
        </main>
    )
}

export default CommunityVoting;