import IntroSection from '@/components/IntroSection/IntroSection';
import ImageSection from '@/components/ImageSection/ImageSection';
import CarouselSection from '@/components/CarouselSection/CarouselSection';
import VideoSection from '@/components/VideoSection/VideoSection';
import TextSection from '@/components/TextSection/TextSection';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { PageBlock, CarouselSectionBlock } from '@/types/strapi';

interface BlockRendererProps {
    blocks: PageBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
    return (
        <>
            {blocks.map((block) => {
                switch (block.__component) {
                    case 'sections.intro-section':
                        return (
                            <IntroSection
                                key={block.id}
                                headingAccent={block.headingAccent}
                                headingBase={block.headingBase}
                                paragraph={block.paragraph}
                                imageSrc={getStrapiMediaUrl(block.image?.url)}
                                imageAlt={block.imageAlt ?? block.image?.alternativeText ?? 'Image'}
                            />
                        );

                    case 'sections.image-section':
                        return (
                            <ImageSection
                                key={block.id}
                                image={getStrapiMediaUrl(block.image.url)}
                                title={block.title}
                                description={block.description}
                                buttonText={block.buttonText}
                                buttonHref={block.buttonHref}
                                imagePosition={block.imagePosition}
                            />
                        );

                    case 'sections.carousel-section': {
                        const carouselBlock = block as CarouselSectionBlock;
                        return (
                            <CarouselSection
                                key={carouselBlock.id}
                                heading={carouselBlock.heading}
                                paragraph={carouselBlock.paragraph ?? ''}
                                textPosition={carouselBlock.textPosition}
                                cards={carouselBlock.cards.map((card) => ({
                                    image: getStrapiMediaUrl(card.image?.url),
                                    title: card.title,
                                    description: card.description ?? '',
                                    href: card.href ?? '/',
                                }))}
                            />
                        );
                    }

                    case 'sections.video-section': {
                        const videos: string[] = [];
                        if (block.video?.url) videos.push(getStrapiMediaUrl(block.video.url));
                        if (block.videoUrl) videos.push(block.videoUrl);
                        return (
                            <VideoSection
                                key={block.id}
                                videos={videos}
                                posterUrl={getStrapiMediaUrl(block.posterImage?.url)}
                                autoplay={block.autoplay}
                                loop={block.loop}
                                muted={block.muted}
                            />
                        );
                    }

                    case 'sections.text-section':
                        return (
                            <TextSection
                                key={block.id}
                                content={block.content}
                            />
                        );

                    default:
                        // Unknown block type — fail gracefully in production
                        if (process.env.NODE_ENV === 'development') {
                            console.warn('Unknown block component:', (block as any).__component);
                        }
                        return null;
                }
            })}
        </>
    );
}
