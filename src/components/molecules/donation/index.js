import { Component } from 'preact';
import style from './style';
import Title from '../../atoms/title';
import Subtitle from '../../atoms/subtitle';
import ProgressBar from '../../atoms/progressbar';
import { getPercent } from '../../../common/getPercent';

const API = 'https://coop-mock-test-api.herokuapp.com';

export default class Donation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: {
				status: '-',
				target: '-',
				raised: '-'
			},
			donation: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		try {
			const res = await fetch(API);
			const json = await res.json();
			const results = json ? json : null;
			this.setState({
				results,
				progressPerc: getPercent(results.raised, results.target)
			});
		}
 catch (error) {
			console.log(`Error: ${error}`);
			this.setState({ results: { status: 'error' } });
		}
	}

	handleChange(event) {
		const { results, donation } = this.state;
		this.setState({
			donation: event.target.value
		});
	}

	handleSubmit(event) {
		const { results, donation } = this.state;
		event.preventDefault();
		console.log(`You donated: ${donation}`);
		this.setState(
			{
				results: {
					...results,
					raised: (
						parseFloat(results.raised, 10) + parseFloat(donation, 10)
					).toFixed(2)
				}
			},
			() => {
				this.setState({
					progressPerc: getPercent(this.state.results.raised, results.target)
				});
			}
		);
	}

	render(props, { results, progressPerc }) {
		return (
			<article class={style.article}>
				<Title text="Help refugees rebuild their lives and communities in Manchester" />
				<Subtitle text="Manchester Refugee Support Network (MRSN)" />

				{results.status === 'OK' ? (
					<section class={style.dataContent}>
						<ProgressBar percent={progressPerc} />
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
					</section>
				) : (
					<p>Problem connecting, please try again later.</p>
				)}
				<form onSubmit={this.handleSubmit}>
					<legend id="donate-title">Donate to this project</legend>
					<section>
						<input
							aria-labelledby="donate-title"
							onChange={this.handleChange}
						/>
						<button type="submit">Donate</button>
					</section>
				</form>
				<a href="#" class={style.cta}>
          Learn more about causes local to you
				</a>
			</article>
		);
	}
}
