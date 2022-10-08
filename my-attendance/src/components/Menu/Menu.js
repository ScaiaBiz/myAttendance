import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuElements } from '../../__data/common';

import classes from './Menu.module.css';

function Menu() {
	// MenuElements;

	const showSubMenu = id => {
		// let el = document.getElementById(id);
		// el.classList.toggle(classes.subM_Visible);
	};

	//TODO: Valutare sottomenù e gestione animazione apertura/chiusura

	const evalMenuElements = (el, level) => {
		if (!level) {
			level = 0;
		}
		const menuEl = el.map(e => {
			let classN;
			switch (level) {
				case 0:
					classN = navData =>
						`${classes.navEl} ${navData.isActive && classes.active}`;
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
				level++;
				const subElement = evalMenuElements(e.subMenu, level);
				return (
					<React.Fragment>
						<NavLink
							key={e._id}
							className={classN}
							to={e.path}
							style={{ marginBottom: 0 }}
							onClick={() => showSubMenu(e._id)}
						>
							{e.description}
						</NavLink>
						<div id={e._id} className={`${classes.subM}`}>
							{subElement}
						</div>
					</React.Fragment>
				);
			}

			return (
				<NavLink key={e._id} className={classN} to={e.path}>
					{e.description}
				</NavLink>
			);
		});
		return menuEl;
	};

	return (
		<div className={classes.container}>
			<nav className={classes.navigation}>{evalMenuElements(MenuElements)}</nav>
			<div>Login / Logout</div>
		</div>
	);
}

export default Menu;
