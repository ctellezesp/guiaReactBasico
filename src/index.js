import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


class Twitter extends React.Component{
	constructor(props){
		super(props);
		this.myRef = React.createRef();
		this.subirTweet = this.subirTweet.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state = {
			tweets: []
		}
	}

	subirTweet(){
		/*this.setState({
			tweets: [
				{user_name: 'Carlos', created_at: new Date().toString(), description: this.myRef.current.value, id: 1000}, 
				...this.state.tweets
				]
			});*/

		let tweet = {
			user_name: 'Carlos',
			avatar: 'https://avatars0.githubusercontent.com/u/26472750?s=460&v=4',
			description: this.myRef.current.value
		}

		let headers = {};
		headers['Content-Type'] = 'application/json';

		let options = {
			headers: headers,
			method: 'POST',
			body: JSON.stringify(tweet)
		}

		fetch('https://still-garden-88285.herokuapp.com/draft_tweets', options)
		.then(res => res.json())
		.then(

			(result) => {
				let newTweet = result.draft_tweet;
				let tweets = this.state.tweets.slice();
				this.setState({
					tweets: newTweet.concat(tweets)
				})
			},

			(error) => {
				alert('No se pudo');
			}
		)

		this.myRef.current.value = '';
		this.myRef.current.focus();



	}


	componentDidMount(){
		fetch('https://still-garden-88285.herokuapp.com/draft_tweets')
		.then(res => res.json())
		.then(

			(result) => {
				this.setState({
					tweets: result.draft_tweets
				});
				console.log(result.draft_tweets);
			},

			(error) => {
				alert('No hay tweets');
			}
		)
	}



	render(){
		return(
			<div id="main">
				<input type="text" placeholder="What's Happening?" ref={this.myRef} />
				<button onClick={this.subirTweet}>Tweet</button>
				<div className="landing">
					{this.state.tweets.map((tweet) => 
							
						<div key={tweet.id}>
							<span>{tweet.user_name} | {tweet.created_at}</span><br/>
							<span>{tweet.description}</span>
							<hr/>
						</div>
						
					)}
					
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Twitter />,
	document.getElementById('root')
)