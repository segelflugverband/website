import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsCarouselSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_carousel_sections';
  info: {
    description: 'A section with a heading, paragraph text, and a scrollable set of cards';
    displayName: 'Carousel Section';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    paragraph: Schema.Attribute.Text;
    textPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface SectionsCollapsibleTextCollection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_collapsible_text_collections';
  info: {
    description: 'A collection of FAQ-style collapsible text items';
    displayName: 'Collapsible Text Collection';
    icon: 'bulletList';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.collapsible-text', true>;
  };
}

export interface SectionsImageSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_sections';
  info: {
    description: 'Full-width section with a background image on one side and a text/button box on the other';
    displayName: 'Image Section';
    icon: 'picture';
  };
  attributes: {
    buttonHref: Schema.Attribute.String & Schema.Attribute.Required;
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_intro_sections';
  info: {
    description: 'Hero intro block with accent heading, base heading, paragraph, and a circular image';
    displayName: 'Intro Section';
    icon: 'oneToMany';
  };
  attributes: {
    headingAccent: Schema.Attribute.String & Schema.Attribute.Required;
    headingBase: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    paragraph: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    description: 'A full-width rich text content block';
    displayName: 'Text Section';
    icon: 'write';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_sections';
  info: {
    description: 'Full-width video section \u2014 use either an uploaded video file or an external URL (YouTube/Vimeo)';
    displayName: 'Video Section';
    icon: 'play';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    loop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    muted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    posterImage: Schema.Attribute.Media<'images'>;
    video: Schema.Attribute.Media<'videos'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    description: 'A card used inside a carousel section';
    displayName: 'Card';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCollapsibleText extends Struct.ComponentSchema {
  collectionName: 'components_shared_collapsible_texts';
  info: {
    description: 'An FAQ-style accordion item';
    displayName: 'Collapsible Text';
    icon: 'collapse';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'A column of links in the footer';
    displayName: 'Footer Column';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'shared.footer-link', true>;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    description: 'A single link inside a footer column';
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    description: 'A top-level navigation item in the header (optionally with a submenu)';
    displayName: 'Nav Item';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    submenu: Schema.Attribute.Component<'shared.submenu-item', true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for a page';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'A social media platform link';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'other']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSubmenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_submenu_items';
  info: {
    description: 'A single item inside a header nav submenu';
    displayName: 'Submenu Item';
    icon: 'link';
  };
  attributes: {
    description: Schema.Attribute.String;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.carousel-section': SectionsCarouselSection;
      'sections.collapsible-text-collection': SectionsCollapsibleTextCollection;
      'sections.image-section': SectionsImageSection;
      'sections.intro-section': SectionsIntroSection;
      'sections.text-section': SectionsTextSection;
      'sections.video-section': SectionsVideoSection;
      'shared.card': SharedCard;
      'shared.collapsible-text': SharedCollapsibleText;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-link': SharedFooterLink;
      'shared.nav-item': SharedNavItem;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.submenu-item': SharedSubmenuItem;
    }
  }
}
