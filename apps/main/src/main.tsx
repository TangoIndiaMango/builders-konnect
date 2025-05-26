import '@ant-design/v5-patch-for-react-19';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp, ConfigProvider } from 'antd';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import ErrorBoundary from './app/components/ErrorBoundary';

// const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
//   useGetPermissions();
//   return <>{children}</>;
// };

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
        Menu: {
          itemSelectedBg: '#E6F7FF',
          itemSelectedColor: '#003399',
          colorText: '#434343',
          activeBarWidth: 2,
        },
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
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AntApp>
      </QueryClientProvider>
    </Router>
  </ConfigProvider>
);
