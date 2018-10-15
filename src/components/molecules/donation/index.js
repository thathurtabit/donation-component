import { Component } from "preact";
import style from "./style";
import Title from "../../atoms/title";
import Subtitle from "../../atoms/subtitle";
import ProgressBar from "../../atoms/progressbar";
import Loader from "../../atoms/loader";
import * as CONSTANTS from "../../../common/constants";
import { getPercent } from "../../../common/getPercent";
import { timeout } from "../../../common/timeout";
import { formatCurrency } from "../../../common/formatCurrency";

export default class Donation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      API: props.API,
      results: {
        status: "-",
        target: "-",
        raised: "-"
      },
      donation: 0,
      value: '',
      progressPerc: 0,
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(this.state.API)
      .then(res => res.json())
      .then(results => {
        timeout(1000).then(() => {
          this.setState({
            results,
            loading: false,
            progressPerc: getPercent(results.raised, results.target)
          });
        });
      })
      .catch(error => {
        this.setState({ APIError: true, loading: false });
        console.log(`Error: ${error}`);
      });
  }

  handleChange(event) {
    const input = event.target.value;
    if (isNaN(parseFloat(input))) {
      this.setState({
        donation: 0
      });
    } else {
      this.setState({
        donation: event.target.value
      });
    }
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
        }, () => {
          this.setState({
            value: ''
          });
        });
      }
    );
  }

  render(props, { results, progressPerc, loading, APIError, value }) {
    return (
      <article class={style.article}>
        <section class={style.indent}>
          <Title text={CONSTANTS.TITLE_TXT} />
          <Subtitle text={CONSTANTS.SUBTITLE_TXT} />

          <ProgressBar percent={progressPerc} />

          <section class={style.loadedData}>
            {loading && <Loader />}

            <section
              class={`${style.dataContent} ${!loading &&
                results.status === "OK" &&
                style.dataContentShow}`}
            >
              <h4 class={style.dataHeader}>{CONSTANTS.RAISED_TXT}</h4>
              <p id="raised" class={style.dataAmount}>
                &pound;
                {formatCurrency(results.raised)}
              </p>
              <h4 class={style.dataHeader}>{CONSTANTS.TARGET_TXT}</h4>
              <p id="target" class={style.dataAmount}>
                &pound;
                {formatCurrency(results.target)}
              </p>
            </section>

            {!loading &&
              APIError && (
                <p id="error" class={style.error}>
                  {CONSTANTS.ERROR_TXT}
                </p>
              )}
          </section>

          <form class={style.formDonate} onSubmit={this.handleSubmit}>
            <legend id="donate-title">{CONSTANTS.DONATE_TXT}</legend>
            <section class={style.formDonateRow}>
              <input
                aria-labelledby="donate-title"
                maxLength="8"
                value={value}
                onChange={this.handleChange}
              />
              <button type="submit">{CONSTANTS.DONATE_BTN_TXT}</button>
            </section>
          </form>
        </section>
        <a href="#" class={style.cta}>
          {CONSTANTS.CTA_TXT}
        </a>
      </article>
    );
  }
}
