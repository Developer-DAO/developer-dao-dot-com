import React from 'react';
import PropTypes from 'prop-types';

function IconTwitter({ className = '' }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#1D9BF0" />
      <path
        d="M30.094 14.9794C30.109 15.1964 30.109 15.4134 30.109 15.6324C30.109 22.3054 25.029 30.0014 15.74 30.0014V29.9974C12.997 30.0004 10.309 29.2144 8 27.7324C8.399 27.7804 8.8 27.8044 9.202 27.8054C11.476 27.8074 13.685 27.0444 15.474 25.6394C13.313 25.5984 11.418 24.1894 10.756 22.1324C11.513 22.2784 12.293 22.2484 13.036 22.0454C10.68 21.5694 8.985 19.4984 8.985 17.0944C8.985 17.0724 8.985 17.0514 8.985 17.0304C9.687 17.4214 10.473 17.6384 11.277 17.6624C9.057 16.1814 8.373 13.2294 9.713 10.9214C12.277 14.0764 16.06 15.9944 20.121 16.1984C19.714 14.4444 20.27 12.6064 21.582 11.3734C23.616 9.46136 26.815 9.55936 28.727 11.5924C29.858 11.3694 30.942 10.9544 31.934 10.3664C31.557 11.5354 30.768 12.5284 29.714 13.1594C30.715 13.0414 31.693 12.7734 32.614 12.3644C31.936 13.3794 31.083 14.2644 30.094 14.9794Z"
        fill="white"
      />
    </svg>
  );
}

IconTwitter.propTypes = {
  className: PropTypes.string,
};

export default IconTwitter;
