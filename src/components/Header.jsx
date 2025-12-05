import ExtendedLink from './ExtendedLink';

export default function Header() {
	return (
		<header className="site-header">
			<div className="header-component site-content">
				<div>
					<img src="/logo-mini.png" alt="Logo" width="100" height="87" />
				</div>
				<nav aria-label="Main Navigation">
					<ul className="main-navigation">
						<li>
							<ExtendedLink href="/">Home</ExtendedLink>
						</li>
						<li>
							<ExtendedLink href="/shows">Shows</ExtendedLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
