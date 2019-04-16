import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = { title: '' };
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.mutate({
			variables: { title: this.state.title },
		});
	}

	render() {
		return (
			<div>
				<h3>Create a new song</h3>
				<form onSubmit={e => this.onSubmit(e)}>
					<label>Song Title:</label>
					<input
						type="text"
						onChange={e => this.setState({ title: e.target.value })}
						value={this.state.title}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			id
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
