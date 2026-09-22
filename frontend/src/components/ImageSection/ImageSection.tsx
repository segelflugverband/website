import { H2 } from "@/components/ui/Headings";
import { ButtonPrimary } from "@/components/ui/Buttons";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface ImageSectionProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    imagePosition?: 'left' | 'right';
}

export default function ImageSection({ image, title, description, buttonText, buttonHref, imagePosition = 'left' }: ImageSectionProps) {
    const isLeft = imagePosition === 'left';

    return (
        <Container as="section" padded="desktop-only" className={`relative w-full flex flex-col xl:flex-row items-center xl:min-h-150 group overflow-hidden pb-12 xl:pb-0 ${isLeft ? 'xl:justify-end' : 'xl:justify-start'}`}>
            {/* Image Container */}
            <div className={`relative xl:absolute xl:inset-y-0 w-full h-87.5 md:h-112.5 xl:h-auto xl:w-[60%] overflow-hidden ${isLeft ? 'xl:left-24' : 'xl:right-24'}`}>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-100"
                />
            </div>

            {/* Info Box */}
            <div className={`relative z-10 w-[90%] md:w-[80%] xl:w-[40%] bg-white p-8 md:p-12 xl:p-16 mx-auto xl:mx-0 -mt-16 md:-mt-24 xl:mt-0 transition-shadow duration-500 shadow-sm group-hover:shadow-[0_20px_50px_rgba(10,10,130,0.08)] ${isLeft ? 'xl:mr-[10%]' : 'xl:ml-[10%]'}`}>
                <H2 className="mb-6">{title}</H2>
                <p className="text-text-primary mb-9 text-[16px] leading-relaxed">
                    {description}
                </p>
                <ButtonPrimary text={buttonText} href={buttonHref} />
            </div>
        </Container>
    );
}