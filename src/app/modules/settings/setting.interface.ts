export type TSetting = {
  siteName?: string;
  siteLogo?: string;
  showSiteNameAndLogo: boolean;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactInfo: {
    email?: string[];
    phone?: string[];
    address?: string[];
  };
  aboutUs?: string;
  termsAndConditions?: string;
  privacyPolicy?: string;
  helpLine?: string[];
  bannerSection: {
    title?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
    showButton: boolean;
  };
};
