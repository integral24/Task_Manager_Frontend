import { Link } from 'react-router-dom';

export interface IRoutes {
	routes: {
		to: string;
		name: string;
	}[];
}

const Navigation: React.FC<IRoutes> = (props) => {
	return (
		<>
			<nav className="nav">
				{props.routes.map(({ to, name }) => (
					<Link to={to} key={name}>
						{name}
					</Link>
				))}
			</nav>
		</>
	);
};

export default Navigation;
