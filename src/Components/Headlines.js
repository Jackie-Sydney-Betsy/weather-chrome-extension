/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import Axios from 'axios';

class Headlines extends Component {
	constructor() {
		super();
		this.state = {
			articles: [],
		};
	}

	async componentDidMount() {
		try {
			//get top environment news articles using gnews
			const { data } = await Axios.get(
				`https://gnews.io/api/v4/search?q=climate%20change&max=3&token=${process.env.REACT_APP_api_news}`
			);
			this.setState({ articles: data.articles });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<>
				<div className='headlines'>
					<div id='heading'>
						<h2>Top Climate Change Headlines Today</h2>
					</div>
					<div id='list'>
						{this.state.articles.length ? (
							this.state.articles.map((article) => {
								return (
									<div className='headline' key={article.title}>
										<div id='article-text'>
											<a href={article.url}>{article.title}</a>
											<p id='description'>{article.description}</p>
										</div>
										<div>
											<img id='article-image' src={article.image} />
										</div>
									</div>
								);
							})
						) : (
							<div></div>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default Headlines;
