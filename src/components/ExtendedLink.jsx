import { Link, useRoute } from 'wouter';

export default function ExtendedLink(props) {
	const [isActive] = useRoute(props.href);

	return (
		<Link {...props} asChild>
			<a aria-current={isActive ? 'page' : ''}>{props.children}</a>
		</Link>
	);
}
