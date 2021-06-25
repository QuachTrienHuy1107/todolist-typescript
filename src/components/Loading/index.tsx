import "./style.scss"

const Loading: React.FC<Record<string, never>> = () => (
    // const {isLoading} ;
    <div className="loading">
        <img src="./img/loading.gif" alt="" />
    </div>
)
export default Loading
