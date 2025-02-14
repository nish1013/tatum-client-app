import tatumLogo from '../../assets/tatum.jpeg';
import Form from './form';
import './style.css';

export function Home() {
	return (
		<div className="home flex flex-col items-center space-y-6">
			<h1 className="flex items-center text-lg font-semibold text-white mt-6">
				<span className="leading-none">Wallet Balance Checker</span>
			</h1>
			<Form />
			<img src={tatumLogo} alt="Tatum Logo" className="w-12 h-12 rounded-full" />
		</div>
	);
}
