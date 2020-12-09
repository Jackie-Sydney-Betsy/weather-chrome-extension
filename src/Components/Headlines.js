/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import Axios from 'axios';
// require('dotenv').config();

import articles from './data';

const api_news = 'f04ec099625cca548c7fa2c3011e26f3';

class Headlines extends Component {
	constructor() {
		super();
		this.state = {
			enviroNews: { articles: articles },
			date: '',
		};
	}

	componentDidMount() {
		// try {
		// 	//get top environment news articles using gnews
		// 	const { data } = await Axios.get(
		// 		`https://gnews.io/api/v4/search?q=climate%20change&max=3&token=${api_news}`
		// 	);
		// 	this.setState({ enviroNews: data });
		// } catch (err) {
		// 	console.log(err);
		// }
		// const date = new Date();
		// console.log(date);
		// this.setState({ date: date });
	}

	render() {
		return (
			<>
				<div className='headlines'>
					<div id='heading'>
						<h2>Top Climate Change Headlines Today</h2>
					</div>
					<div id='list'>
						{this.state.enviroNews ? (
							this.state.enviroNews.articles.map((article) => {
								return (
									<div className='headline' key={article.title}>
										<div id='article-text'>
											<a href={article.url}>{article.title}</a>
											<p id='description'>{article.description}</p>
										</div>
										<div>
											<img
												id='article-image'
												src='https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515341_10369.jpg'
											/>
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
