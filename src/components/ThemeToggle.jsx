// // src/components/ThemeToggle.jsx
// import useTheme from "../hooks/useTheme";

// export const ThemeToggle = () => {
//   const { theme, setTheme } = useTheme();

//   const isDark = theme === "dark";

//   const toggle = () => setTheme(isDark ? "light" : "dark");

//   return (
//     <button
//       onClick={toggle}
//       aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
//       title={isDark ? "Light mode" : "Dark mode"}
//       className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//     >
//       {/* simple icons (sun / moon) */}
//       {isDark ? (
//         // Sun icon for switching to light
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-yellow-400"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
//           <path
//             d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
//             stroke="currentColor"
//             strokeWidth="0"
//           />
//         </svg>
//       ) : (
//         // Moon icon for switching to dark
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-indigo-600"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
//         </svg>
//       )}

//       <span className="sr-only">
//         {isDark ? "Enable light mode" : "Enable dark mode"}
//       </span>

//       {/* visible label (optional) */}
//       <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
//         {isDark ? "Light" : "Dark"}
//       </span>
//     </button>
//   );
// };
