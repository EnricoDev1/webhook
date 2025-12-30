export function getTheme(dark) {
  return {
    // background & text
    appBg: dark ? 'bg-gray-900' : 'bg-gray-50',
    appText: dark ? 'text-gray-100' : 'text-gray-900',

    // cards
    cardBg: dark ? 'bg-gray-800' : 'bg-white',
    cardBorder: dark ? 'border-gray-700' : 'border-gray-200',

    // text
    mutedText: dark ? 'text-gray-400' : 'text-gray-600',

    // states
    hoverRow: dark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    selectedRow: dark ? 'bg-blue-900/30' : 'bg-blue-50',

    // buttons
    primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryBtn: dark
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700',

    dangerBtn: dark
      ? 'bg-red-900/40 hover:bg-red-800/40 text-red-200'
      : 'bg-red-100 hover:bg-red-200 text-red-700',
  };
}
