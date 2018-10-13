import style from './style';

const ProgressBar = ({ percent }) => (
	<section class={style.progress}>
		<span
			data-progress={percent}
			style={{
				transform: `translateX(-${percent >= 100 ? '0' : 100 - percent}%)`
			}}
			class={style.bar}
		>
			{percent}% of target raised
		</span>
	</section>
);

export default ProgressBar;
