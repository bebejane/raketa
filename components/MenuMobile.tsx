'use client';

import s from './MenuMobile.module.scss';
import cn from 'classnames';
import { useStore } from '@/lib/store';
import { useRef } from 'react';

export type Props = {
	allProjects: StartQuery['allProjects'];
};

export default function MenuMobile({ allProjects }: Props) {
	const [showMobileMenu, setShowMobileMenu] = useStore((state) => [state.showMobileMenu, state.setShowMobileMenu]);
	const ref = useRef<HTMLUListElement | null>(null);

	return (
		<nav id='mobile-menu' className={cn(s.menuMobile)}>
			<h2 onClick={() => setShowMobileMenu(!showMobileMenu)}>
				PROJECTS<span className={cn(showMobileMenu && s.open)}>&gt;</span>
			</h2>
			<ul ref={ref} style={{ maxHeight: showMobileMenu ? (ref.current?.scrollHeight ?? 0) : 0 }}>
				{allProjects.map(({ id, title, slug }, idx) => (
					<li key={id} className={cn()}>
						<a href={`#${slug}`}>{title}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
