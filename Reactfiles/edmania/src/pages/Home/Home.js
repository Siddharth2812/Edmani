import ChatBot from "../../components/ChatBot/Chatbot";
import Subjects from "../../components/Subjecs/Subjects";
import Services from "../../components/ServiceComps/services";
const Home = () => {
    return (
        <div className="Home">
            <Subjects/>
            <ChatBot/>
            <Services/>
        </div>
    )
}

export default Home;