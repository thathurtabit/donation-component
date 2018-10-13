import { h } from 'preact';
import style from './style';

const Title = ({ text }) => <h1 class={style.title}>{text}</h1>;

export default Title;
