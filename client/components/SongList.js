import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import query from '../queries/fetchSongs.js';

class SongList extends React.Component {
	onSongDelete(id) {
		this.props
			.mutate({
				variables: {
					id,
				},
			})
			/*
			Quando queremos fazer um reload do componente,
			rodando a mesma query que traz os dados que
			ele utiliza com this.props.data, podemos
			utilizar this.props.data.refetch() em vez de
			manualmente rodar as queries com o refetchQueries
			no mutate, como em SongCreate.js
			 */
			.then(() => this.props.data.refetch());
	}

	renderSongs() {
		return this.props.data.songs.map(song => {
			return (
				<li key={song.id} className="collection-item">
					<Link to={`/songs/${song.id}`}>{song.title}</Link>

					<i
						className="material-icons"
						onClick={() => this.onSongDelete(song.id)}>
						delete
					</i>
				</li>
			);
		});
	}

	render() {
		if (this.props.data.loading) return <div>loading</div>;

		return (
			<div>
				<ul className="collection">{this.renderSongs()}</ul>
				<Link
					to="songs/new"
					className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
			title
		}
	}
`;

export default graphql(mutation)(graphql(query)(SongList));
