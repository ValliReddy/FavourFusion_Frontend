// import React from 'react';

// import {
//   FacebookShareButton,
//   WhatsappShareButton,
//   FacebookIcon,
//   WhatsappIcon
// } from 'react-share';

// const SocialShare = ({ url, title, text }) => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <style>
//         {`
//           .react-share__ShareButton {
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             padding: 0;
//             background-color: transparent;
//             border: none;
//             cursor: pointer;
//           }

//           .react-share__ShareButton > svg {
//             width: 32px;
//             height: 32px;
//             border-radius: 50%;
//           }
//         `}
//       </style>

//       <FacebookShareButton url={url} quote={title}>
//         <FacebookIcon size={32} />
//       </FacebookShareButton>

//       <WhatsappShareButton url={url} title={title}>
//         <WhatsappIcon size={32} />
//       </WhatsappShareButton>
//     </div>
//   );
// };

// export default SocialShare;


// import SocialShare from './ShareFavourites';

// const shareUrl = window.location.href;  //current url of page will be shared
// const shareTitle = 'Check out this cool web app!';
// const shareText = 'Hey, I found this amazing app that you should check out!';

// <SocialShare url={shareUrl} title={shareTitle} text={shareText} />
