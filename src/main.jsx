import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './index.css'
import App from './App.jsx'

const client = new ApolloClient({
  uri: 'https://fuurd5g4s0.execute-api.us-east-1.amazonaws.com/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)

