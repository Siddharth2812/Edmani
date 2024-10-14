    import "./Subjects.css"

    const Subjects = () => {
        return (
            <div className="Subjects">
                <a href="/maths" className="SubBtn">
                    <button >
                        Maths
                    </button>
                </a>
                <a href="/physics"  className="SubBtn">
                    <button >
                        Physics
                    </button>
                </a>
                <a href="/chemistry" className="SubBtn">
                    <button >
                        Chemistry
                    </button>
                </a>
                <a href="/english" className="SubBtn">
                    <button >
                        English
                    </button>
                </a>
            </div>
        )
    }

    export default Subjects;