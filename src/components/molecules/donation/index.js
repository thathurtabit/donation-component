import { Component } from 'preact';
import WebFont from 'webfontloader';
import style from './style';

WebFont.load({
	google: {
		families: ['Roboto Condensed', 'Roboto']
	}
});

const API = 'https://coop-mock-test-api.herokuapp.com';

export default class Donation extends Component {
  state = {
  	results: {
  		status: '-',
  		target: '-',
  		raised: '-'
  	}
  };

  async componentDidMount() {
  	try {
  		const res = await fetch(API);
  		const json = await res.json();
  		const results = json ? json : null;
  		this.setState({ results });
  	}
 catch (error) {
  		console.log(`Error: ${error}`);
  		this.setState({ results: { status: 'error' } });
  	}

  	console.log('this.state: ', this.state);
  }

  render(props, { results }) {
  	return (
  		<article class={style.article}>
  			<h1 id="title">
          Help refugees rebuild their lives and communities in Manchester
  			</h1>
  			<h2 id="subtitle">Manchester Refugee Support Network (MRSN)</h2>

  			{results.status === 'OK' ? (
  				<div>
  					<p>
              Raised so far: &pound;
  						{results.raised}
  					</p>
  					<p>
              Target &pound;
  						{results.target}
  					</p>
  				</div>
  			) : (
  				<p>Problem connecting, please try again later.</p>
  			)}
  		</article>
  	);
  }
}
