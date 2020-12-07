/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import Axios from 'axios';
// require('dotenv').config();

const api_news = 'f04ec099625cca548c7fa2c3011e26f3';

class Headlines extends Component {
	constructor() {
		super();
		this.state = {
			enviroNews: { articles: [] },
		};
	}

	async componentDidMount() {
		try {
			//get top environment news articles using gnews
			const { data } = await Axios.get(
				`https://gnews.io/api/v4/search?q=climate&max=3&token=${api_news}`
			);
			this.setState({ enviroNews: data });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		// console.log('state in render: ', this.state);
		return (
			<>
				<div className='headlines'>Headlines</div>
				{this.state.enviroNews ? (
					this.state.enviroNews.articles.map((article) => {
						return (
							<div>
								<h1>
									<a src={article.source.url}>{article.title}</a>
								</h1>
								<p>{article.author}</p>
							</div>
						);
					})
				) : (
					<div></div>
				)}
			</>
		);
	}
}

export default Headlines;
