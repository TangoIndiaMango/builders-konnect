
import '@ant-design/v5-patch-for-react-19';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ConfigProvider, App as AntApp } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#003399',
        borderRadius: 2,
      },
      components: {
        Segmented: {
          itemSelectedBg: '#003399',
          itemSelectedColor: '#fff',
          colorText: '#fff',
        },
      },
    }}
  >
    <Router>
      <QueryClientProvider client={queryClient}>
        <AntApp notification={{ placement: 'topRight', maxCount: 3 }}>
          <App />
        </AntApp>
      </QueryClientProvider>
    </Router>
  </ConfigProvider>
);
