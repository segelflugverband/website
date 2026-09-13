import { H1 } from '@/components/ui/Headings';
import Image from 'next/image';

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
        <div className="flex justify-between items-center w-full max-w-[1400px]">
            <div>
                <H1>
                    <span className="text-accent-primary">{headingAccent}</span>
                    <br />
                    {headingBase}
                </H1>
                <p className="ml-[4rem] mt-[2rem] max-w-[50%] text-xl leading-relaxed">
                    {paragraph}
                </p>
            </div>
            <Image 
                src={imageSrc} 
                alt={imageAlt} 
                width={500} 
                height={500} 
                className="h-[19rem] w-[19rem] aspect-square object-cover rounded-full shadow-xl" 
            />
        </div>
    );
}
