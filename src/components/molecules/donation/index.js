import { Component } from 'preact';
import style from './style';
import Title from '../../atoms/title';
import Subtitle from '../../atoms/subtitle';
import ProgressBar from '../../atoms/progressbar';
import { getPercent } from '../../../common/getPercent';
import { timeout } from '../../../common/timeout';
import { formatCurrency } from '../../../common/formatCurrency';

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
			donation: 0,
			progressPerc: 0,
			loading: true
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		try {
			const res = await fetch(API);
			const json = await res.json();
			const results = json ? json : null;

			(async () => {
				await timeout(1000);
				this.setState({
					results,
					loading: false,
					progressPerc: getPercent(results.raised, results.target)
				});
			})();
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

	render(props, { results, progressPerc, loading }) {
		return (
			<article class={style.article}>
				<section class={style.indent}>
					<Title text="Help refugees rebuild their lives and communities in Manchester" />
					<Subtitle text="Manchester Refugee Support Network (MRSN)" />

					{loading && <p>Loading...</p>}

					<ProgressBar percent={progressPerc} />

					{!loading &&
            results.status === 'OK' && (
						<section class={style.dataContent}>
							<h4 class={style.dataHeader}>Raised so far</h4>
							<p class={style.dataAmount}>
                  &pound;
								{formatCurrency(results.raised)}
							</p>
							<h4 class={style.dataHeader}>Target</h4>
							<p class={style.dataAmount}>
                  &pound;
								{formatCurrency(results.target)}
							</p>
						</section>
					)}

					{!loading &&
            !results.stats === 'OK' && (
						<p>Problem connecting, please try again later.</p>
					)}

					<form class={style.formDonate} onSubmit={this.handleSubmit}>
						<legend id="donate-title">Donate to this project</legend>
						<section class={style.formDonateRow}>
							<input
								aria-labelledby="donate-title"
								onChange={this.handleChange}
							/>
							<button type="submit">Donate</button>
						</section>
					</form>
				</section>
				<a href="#" class={style.cta}>
          Learn more about causes local to you
				</a>
			</article>
		);
	}
}
