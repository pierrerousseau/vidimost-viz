import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

const App = () => (
    <div>
        <h1>Bienvenue sur ma page React avec FastAPI !</h1>
        <p>Ceci est une application React servie par FastAPI.</p>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
