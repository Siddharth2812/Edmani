import "./services.css"

const Services = () => {
    return (
        <div className="Services">
            <a href="/hackathons" className="ServBtn">
                <button >
                    Hackathons
                </button>
            </a>
            <a href="/games"  className="ServBtn">
                <button >
                    Games
                </button>
            </a>
            <a href="/sports" className="ServBtn">
                <button >
                    Sports
                </button>
            </a>
            <a href="/notes" className="ServBtn">
                <button >
                    Notes
                </button>
            </a>
            <a href="/exams" className="ServBtn">
                <button >
                    Online Exams
                </button>
            </a>
        </div>
    )
}

export default Services;