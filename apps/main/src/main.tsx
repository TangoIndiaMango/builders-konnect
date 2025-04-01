import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#003399',
        borderRadius: 2,

        // Alias Token
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
