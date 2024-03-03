import './App.css';

function App() {
    return (
        <main>
            <header className="header">
                <h1>GitHub Repositories</h1>
                <form>
                    <label htmlFor="search">Type GitHub username</label>
                    <input id="search" type="text" />
                    <div className="buttons">
                        <button id="asyncBtn" type="submit">AsyncSearch</button>
                        <button id="promiseBtn" type="submit">PromiseSearch</button>
                    </div>
                    <span id="span"></span>
                </form>
            </header>
            <div id="repositories"></div>
        </main>
    );
}

export default App;
