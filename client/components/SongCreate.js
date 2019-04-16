import React from 'react';

export default class SongCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = { title: '' };
	}

	render() {
		return (
			<div>
				<h3>Create a new song</h3>
				<form>
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
