import { H1 } from '@/components/ui/Headings';
import Image from 'next/image';
import Container from '@/components/ui/Container';

interface IntroSectionProps {
    headingAccent: string;
    headingBase: string;
    paragraph: string;
    imageSrc: string;
    imageAlt?: string;
}

export default function IntroSection({ 
    headingAccent, 
    headingBase, 
    paragraph, 
    imageSrc, 
    imageAlt = "Image" 
}: IntroSectionProps) {
    return (
        <Container>
            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-350 mx-auto">
            <div className="w-fit">
                <H1>
                    <span className="text-accent-primary">{headingAccent}</span>
                    <br />
                    {headingBase}
                </H1>
                <p className="md:ml-16 mt-8 mb-12 md:mb-0 max-w-[75%] xl:max-w-[50%] text-xl leading-relaxed text-text-quaternary">
                    {paragraph}
                </p>
            </div>
            <Image 
                src={imageSrc} 
                alt={imageAlt} 
                width={500} 
                height={500} 
                className="h-50 w-50 xl:h-76 xl:w-76 aspect-square object-cover rounded-full shadow-xl" 
            />
            </div>
        </Container>
    );
}
