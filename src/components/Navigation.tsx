import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';

export interface IRoutes {
	routes: {
		to: string;
		name: string;
	}[];
}

const Navigation: React.FC<IRoutes> = ({ routes }) => {
	const user = useAppSelector((store) => store.authSlice.user);

	const menu = useMemo(
		() =>
			[...routes].filter((itemMenu) => {
				console.log('menu');
				return user?.email && !itemMenu.to.includes('auth');
				// return itemMenu;
			}),
		[user?.email]
	);

	// const menu = routes.filter((itemMenu) => {
	// 	console.log('menu2');
	// 	// return user?.email && !itemMenu.to.includes('auth');
	// 	return itemMenu;
	// });

	console.count('render');

	return (
		<nav className="top-menu">
			<div className="container">
				<div className="menu">
					<div className="logo">App Task Manager</div>
					<div className="menu__items">
						{menu.map(({ to, name }, i) => (
							<div key={name + i} className="menu__item">
								<NavLink to={to}>{name}</NavLink>
							</div>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
