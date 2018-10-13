import { h } from 'preact';
import style from './style';

const Subtitle = ({ text }) => <h2 class={style.subtitle}>{text}</h2>;

export default Subtitle;
