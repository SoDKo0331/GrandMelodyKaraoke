
import { Suite, Experience } from '../types/index';

export const SUITES: Suite[] = [
  {
    id: 'royal',
    name: 'Royal Suite',
    description: 'Experience the pinnacle of acoustics with our flagship suite. Includes private butler service and a grand piano.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj7VExh1fB0-sSBR1Jq-rgCxEkdxn8xse86Oo-1gNfVxnI_vAwSfrK9V6C4k7Tcy93r73iP9GVAv3CXdWmLb-Jg3JXLGPYxKx7L-nU04GzAgIPFvE80pDfGQpMkwslSM7t4uyLub7wsCGJaeWlDUo_FZfmomJ_u0xkwBybyHtAetLF4KGAH7BwqBd05cw-k2dDzj-ttdGB4ij4ihS3Ni1dKxqNoXq1DQhGHxZ9fw8SmwU4Rk-qH5YgLHgyNfl1C0ahI8YDmiot-CE',
    capacity: '10-25 guests'
  },
  {
    id: 'empress',
    name: 'Empress Chamber',
    description: 'Elegance meets technology. Plush velvet seating and state-of-the-art surround sound for intimate gatherings.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABGt6I6Kz5ElT47HulTuJlYXQxt1BSPETRB7lqnyHVvlwBcSwj1imE4FHHFH3vj5S3QmsvOH-pKBctowdmUxACR0ZTTPZ51aP8Te3rkDQm2VA3ezHzfWX_1GnYnYAN6NCkABSmAC-uceX3-bJc3jRm2wr6N4A2q7ope-WIgHOfNSJGtP-UCdJjkFCY_LJMLtfq22TP8XM-A5wuWMuoaRB9Mi3icSWS7MpL6wAVVT5PRXy_5561zCJ9lXRqyucFe0eyntH3y5LIhQA',
    capacity: '5-12 guests'
  },
  {
    id: 'gold',
    name: 'Gold Parlor',
    description: 'A sophisticated space designed for vocal clarity and premium cocktail service for small groups.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnSBkdy8EjrUssncXpSn9crqjYuEpnZL_WNfXjPsoulReRK1DM4Y8SZYa4DAH-bIhYQG4w08QlwyvVxVGWIDGgSlS8sHb-wzsSyz0A3ExSJNXfCC0hcVZA-G9z3k4ATpW3ou2AmiukFCdTzi0tzq2TVktklRd7lN7Bi_BRwrk8fZuuQtk8BZ-Q1_hK3f5e1gEGCj2y080vs5Bq0upbr_em5QrguGvaavEmCz_6wddN7jtlhkSFyOO-io7CwpSEFazBag6W1N-gbkI',
    capacity: '2-6 guests'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    icon: 'restaurant',
    title: 'GOURMET MENU',
    description: 'From wagyu sliders to fresh truffle frites, our executive chef prepares Michelin-inspired bites for your suite.'
  },
  {
    icon: 'liquor',
    title: 'ELITE DRINK LIST',
    description: 'Rare single malts, vintage champagnes, and artisanal cocktails curated by world-class mixologists.'
  },
  {
    icon: 'auto_awesome',
    title: 'PREMIUM SERVICE',
    description: 'Every room is assigned a private host to ensure your experience remains seamless and sophisticated.'
  }
];

export const CONTACT_INFO = {
  phone: '+1 (555) 012-3456',
  email: 'events@grandmelody.com',
  address: '123 Royal Symphony Blvd, Prestige District, XC 50291',
  hours: {
    weekday: 'Mon - Thu: 5PM - 2AM',
    weekend: 'Fri - Sun: 4PM - 4AM'
  }
};

export const LOGO_URLS = {
  nav: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu6W_uaN7Jnq-7a8Ftyvw-2XCqCMQSMQ-11J87GjmZyLfXG_mpIEkUlAQg0yfXKudb8rcV3vgiZSk_B9Nt4N_Y5Lx0QdycSV1YVguXNKEhUoJzkrkGhmVTKuvrR90hcQtd6GL2FHPXZE8gP_dufjy8AVxrLNCXrljqsoTOLvJ52Qo_QuToKFPaepsNhiKVfglVkc6TJNWzjYXa0xcZ8Y_v1-fjxgdWfl6E0mgRCHdCoy6I3Dd8SDLRGy1FRhfIuX2KHfredrVyDNI',
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2l91vA9nu_nVCYVbHgTrEzJPLgz3wBVQrBBlblFM-jmpJwhwILf-um490Trq36HxxFZ0ussQzEzPwKZZQSakQb7YYx4xkxvnDzyvickbnIt618DGx6J73qwQEo98FC_dSBhMn1jY_rXlgdmpN6DF3IKUqNlx3_xLmMthkZhlLO7D-teH46NBJHzUi0vwWJ5UrOZifWOK3CLPrdzfwgGmO7SdQ_yNVGFkrYtiJcv1tf48aOF7REX9O2cYpMS-y0gi-JgEd-Wx9gik',
  footer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtI0MwIHEXVLtj8CUwIbAL85Hc98P28nLwyljA_ummDaiW3iCmGI1QLrNdVUEMZuGcQ2TM0CtDwvmfIw070hV4MVjLaLj1NY0N6QJL8ztyLfBVpF4PIEtZ37TSat3K3uB1nTXtkhyzNlBNUP73TCmBJIrCx85g_J8OL8w73RmnyOtR2_yR1t1xRfLOXIrRrinCxtWCIMHDnM-_UvO5E9hx6sQalRYs749NccGWquQmR9CnpXltmzSLcmJIDfDKa6nLTDbD8coN-5s'
};
