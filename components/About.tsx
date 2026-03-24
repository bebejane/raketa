'use client';

import s from './About.module.scss';
import { useEffect, useRef, useState } from 'react';
import Content from '@/components/Content';
import { useStore } from '@/lib/store';

export type Props = {
	about: StartQuery['about'];
};

export default function About({ about }: Props) {
	const [showExtended, setShowExtended] = useState(false);
	const [extendedHeight, setExtendedHeight] = useState(0);
	const [setLayoutState] = useStore((state) => [state.setLayoutState]);
	const extendedRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (extendedRef.current) {
			setExtendedHeight(extendedRef.current.scrollHeight);
		}
	}, [extendedRef.current]);

	return (
		<div
			className={s.about}
			onMouseEnter={() => setLayoutState('default')}
			data-datocms-content-link-group={true}
			data-datocms-content-link-url={about?._editingUrl}
		>
			<Content content={about?.intro} className={s.text} />
			<div
				ref={extendedRef}
				className={s.extendedWrap}
				data-datocms-content-link-boundary={true}
				style={{ maxHeight: showExtended ? extendedHeight : 0 }}
			>
				<Content content={about?.extended} />
			</div>

			<span className={s.readMore} onClick={() => setShowExtended(!showExtended)}>
				{!showExtended ? 'Read more ›' : '‹ Read less'}
			</span>
		</div>
	);
}
