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
		this.state = {
			tweets: []
		}
	}

	subirTweet(){
		this.setState({
			tweets: [
				{user: 'Carlos', date: new Date().toString(), post: this.myRef.current.value}, 
				...this.state.tweets
				]
			});

		this.myRef.current.value = '';
		this.myRef.current.focus();
	}

	render(){
		return(
			<div id="main">
				<input type="text" placeholder="What's Happening?" ref={this.myRef} />
				<button onClick={this.subirTweet}>Tweet</button>
				<div className="landing">
					{this.state.tweets.map((tweet, index) => 
							
						<div key={index}>
							<span>{tweet.user} | {tweet.date}</span><br/>
							<span>{tweet.post}</span>
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