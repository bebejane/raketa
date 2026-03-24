import { StructuredContent } from 'next-dato-utils/components';

export type Props = {
	content: any;
	className?: string;
};

export default function Content({ content, className }: Props) {
	if (!content) return null;

	return <StructuredContent className={className} content={content} />;
}
