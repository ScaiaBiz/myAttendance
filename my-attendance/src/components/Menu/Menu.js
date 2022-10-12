import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuElements } from '../../__data/common';

import classes from './Menu.module.css';

function Menu() {
	const [openElId, setOpenElId] = useState('');

	const showSubMenu = id => {
		setOpenElId(id + 'parent');
		let el = document.getElementById(id);
		el.classList.toggle(classes.subM_Visible);
		let pEl = document.getElementById(id + 'parent');
		pEl.classList.toggle(classes.navElOpen);
	};

	const hideSubMenu = level => {
		console.log(level);
		let el = document.getElementsByClassName(classes.subM_Visible);
		Array.prototype.map.call(el, e => {
			e.classList.toggle(classes.subM_Visible);
		});
		setOpenElId('');
	};

	//TODO: Valutare sottomenù e gestione animazione apertura/chiusura

	const evalMenuElements = (el, level = 0, parentPath = '') => {
		const menuEl = el.map(e => {
			let classN;
			switch (level) {
				case 0:
					classN = navData =>
						`${classes.navEl} ${navData.isActive && classes.active} ${
							openElId == e._id + 'parent' && classes.active
						}`;
					break;
				case 1:
					classN = navData =>
						`${classes.navEl} ${navData.isActive && classes.active} ${
							classes.navSubEl1
						}`;
					break;

				default:
					break;
			}

			if (e.subMenu?.length > 0) {
				const subElement = evalMenuElements(e.subMenu, level + 1, e.path);
				return (
					<React.Fragment>
						<NavLink
							key={e._id}
							id={e._id + 'parent'}
							className={classN}
							to={parentPath + e.path}
							style={{ marginBottom: 0 }}
							onClick={() => showSubMenu(e._id)}
						>
							{e.description}
						</NavLink>
						<div id={e._id} className={`${classes.subM}`} level={level}>
							{subElement}
						</div>
					</React.Fragment>
				);
			}
			console.log(e.description + ' level: ' + level);
			return (
				<NavLink
					key={e._id}
					className={classN}
					to={parentPath + e.path}
					onClick={level === 0 ? () => hideSubMenu(level) : ''}
					level={level}
				>
					{e.description}
				</NavLink>
			);
		});
		return menuEl;
	};

	return (
		<div className={classes.container}>
			<nav className={classes.navigation}>{evalMenuElements(MenuElements)}</nav>
			<div className={classes.navElOpen}> Login / Logout</div>
		</div>
	);
}

export default Menu;
