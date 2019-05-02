import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import SongList from './components/SongList.js';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
	/**
	 * Quando rodamos uma query, apollo vai guardar os dados
	 * em um bucket por tipo de dado (bucket para Songs, bucket para Lyrics),
	 * atravez do __typename no retorno, mas não tem como associar
	 * a Lyric com o Song. Aqui estamos dizendo a chava para cada objeto que
	 * vem do servidor.
	 * Isso implica em pedirmos o id em cada query, se não ele não vai conseugir
	 * trackear
	 *
	 * @see https://www.apollographql.com/docs/react/advanced/caching
	 * Principalmetne a parte de normalization
	 */
	dataIdFromObject: o => o.id
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList} />
				</Route>
				<Route path="/songs/new" component={SongCreate} />
				<Route path="/songs/:id" component={SongDetail} />
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
