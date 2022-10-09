import { Routes, Route } from 'react-router-dom';
import { MenuElements } from './__data/common';

import Menu from './components/Menu/Menu';

import classes from './App.module.css';
import Presenze from './components/Presenze/Presenze';

const comp = {
	Presenze: <Presenze />,
};

function App() {
	const evalRoutes = elements => {
		console.log(elements);
		const appRoutes = elements.map(el => {
			let rPath = el.path;
			let rElement = el.element;
			let rSubs = el.subMenu;

			// const sResult = `Route path={${rPath}} element={<${rElement}/>}`

			if (rSubs?.length > 0) {
				const subRoutes = evalRoutes(rSubs);

				return (
					<Route path={rPath} element={comp[rElement]}>
						{subRoutes}
					</Route>
				);
			}
			return <Route path={rPath} element={comp[rElement]} />;
		});
		return appRoutes;
	};

	// const evalSubRoutes

	return (
		<div className={classes.App}>
			<div className={classes.menu}>
				<Menu />
			</div>
			<div className={classes.content}>
				<Routes>{evalRoutes(MenuElements)}</Routes>
			</div>
		</div>
	);
}

export default App;
