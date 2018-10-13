import { Component } from 'preact';
import WebFont from 'webfontloader';
import style from './style';
import Title from '../../atoms/title';
import Subtitle from '../../atoms/subtitle';

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
  }

  render(props, { results }) {
  	return (
  		<article class={style.article}>
  			<Title text="Help refugees rebuild their lives and communities in Manchester" />
  			<Subtitle text="Manchester Refugee Support Network (MRSN)" />

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
