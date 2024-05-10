import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//styles 
import "antd/dist/reset.css";
import './index.scss';
import { PageLoader } from './components/page-loader';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader/>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
