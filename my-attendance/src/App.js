import classes from './App.module.css';

function App() {
	return (
		<div className={classes.App}>
			<div className={classes.menu}>
				<nav>
					<div className={classes.menu__element}>Timbrature</div>
					<div className={classes.menu__element}>Impostazioni</div>
				</nav>
				<div>Login / Logout</div>
			</div>
			<div className={classes.content}></div>
		</div>
	);
}

export default App;
