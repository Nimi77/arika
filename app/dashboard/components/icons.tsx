export const InstagramIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="shrink-0"
  >
    <defs>
      <linearGradient id="ig-gradient-dash" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDD55" />
        <stop offset="50%" stopColor="#FF543E" />
        <stop offset="100%" stopColor="#C837AB" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-gradient-dash)" />
    <path
      fill="#fff"
      d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.92a3.12 3.12 0 1 1 0-6.24 3.12 3.12 0 0 1 0 6.24zM18.4 7.03a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z"
    />
    <path
      fill="#fff"
      d="M16.98 3H7.02A4.03 4.03 0 0 0 3 7.02v9.96A4.03 4.03 0 0 0 7.02 21h9.96A4.03 4.03 0 0 0 21 16.98V7.02A4.03 4.03 0 0 0 16.98 3zm2.5 13.98a2.5 2.5 0 0 1-2.5 2.5H7.02a2.5 2.5 0 0 1-2.5-2.5V7.02a2.5 2.5 0 0 1 2.5-2.5h9.96a2.5 2.5 0 0 1 2.5 2.5v9.96z"
    />
  </svg>
);

export const WhatsAppIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="shrink-0"
  >
    <circle cx="12" cy="12" r="12" fill="#25D366" />
    <path
      fill="#fff"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"
    />
  </svg>
);
