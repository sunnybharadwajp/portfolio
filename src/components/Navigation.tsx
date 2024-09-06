import Link from 'next/link';

export default function Navigation() {
	return (
		<nav className="site-nav">
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/site/work">Work</Link>
				</li>
				<li>
					<Link href="/site/projects">Projects</Link>
				</li>
				<li>
					<Link href="/site/blog">Blog</Link>
				</li>
				<li>
					<Link href="/site/services">Services</Link>
				</li>
			</ul>
		</nav>
	);
}
