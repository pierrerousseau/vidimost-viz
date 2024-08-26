import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';

import { Timeline } from './components/timeline'

const container = document.getElementById('root'),
      root = createRoot(container),
      App = () => (
    <div>
        <div>
            <h1>Timeline</h1>
            <Timeline days={365} />
        </div>
    </div>
);

root.render(<App />);
