import { H2 } from "@/components/ui/Headings";
import { ButtonPrimary } from "@/components/ui/Buttons";
import Image from "next/image";

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
        <section className={`relative w-full min-h-[500px] md:min-h-[600px] flex items-center group overflow-hidden py-12 md:py-0 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            {/* Image Container */}
            <div className={`absolute inset-y-0 w-full md:w-[65%] overflow-hidden ${isLeft ? 'left-0' : 'right-0'}`}>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-100"
                />
            </div>

            {/* Info Box */}
            <div className={`relative z-10 w-[90%] md:w-[50%] lg:w-[40%] bg-white p-8 md:p-12 lg:p-16 mx-auto md:mx-0 transition-shadow duration-500 shadow-sm group-hover:shadow-[0_20px_50px_rgba(10,10,130,0.08)] ${isLeft ? 'md:mr-[5%] lg:mr-[10%]' : 'md:ml-[5%] lg:ml-[10%]'}`}>
                <H2 className="mb-6">{title}</H2>
                <p className="text-text-primary mb-9 text-[16px] leading-relaxed">
                    {description}
                </p>
                <ButtonPrimary text={buttonText} href={buttonHref} />
            </div>
        </section>
    );
}