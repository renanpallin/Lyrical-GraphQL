import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong.js';

class SongDetail extends React.Component {
	render() {
		return (
			<div>
				<h3>Song detail</h3>
			</div>
		);
	}
}

/*
Mutations são chamadas programaticamente, e é onde
passammos variables.
Nas queries, como são aututomáticas, contamos com uma
injeção de pedendência das props do HOC gtaphql.
 */
export default graphql(fetchSong, {
	options: props => {
		return { variables: { id: props.params.id } };
	},
})(SongDetail);
