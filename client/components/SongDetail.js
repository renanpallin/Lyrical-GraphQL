import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong.js';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends React.Component {
	render() {
		const { song } = this.props.data;
		if (!song) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{song.title}</h3>
				<LyricList lyrics={song.lyrics} />
				<LyricCreate songId={song.id} />
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
