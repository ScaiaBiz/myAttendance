import { Routes, Route } from 'react-router-dom';
import { MenuElements } from './__data/common';

import Menu from './components/Menu/Menu';

import classes from './App.module.css';
import Presenze from './components/Presenze/Presenze';
import Dipendenti from './components/Presenze/Dipendenti';

const comp = {
	Presenze: <Presenze />,
	Dipendenti: <Dipendenti />,
};

function App() {
	const evalRoutes = (elements, pRoute = '') => {
		// console.log({ elements });
		// console.log({ pRoute });
		const appRoutes = elements.map(el => {
			let rPath = pRoute + el.path;
			// console.log({ rPath });
			let rElement = el.element;
			let rSubs = el.subMenu;

			if (rSubs?.length > 0) {
				const subRoutes = evalRoutes(rSubs, rPath);

				return (
					<Route key={el._id} path={rPath} element={comp[rElement]}>
						{subRoutes}
					</Route>
				);
			}
			return <Route key={el._id} path={rPath} element={comp[rElement]} />;
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
