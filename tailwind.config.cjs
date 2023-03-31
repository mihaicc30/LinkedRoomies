/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/*.{js,ts,jsx,tsx}", "./*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				'mPulse': 'mPulse 1s infinite',
				'mBounce': 'mBounce 2s ',
				'fadeIN': 'fadeIN .3s ',
				'fadeIN5': 'fadeUP2 1.5s ',
				'fadeOUT': 'fadeOUT .3s ',
				'fadeUP1': 'fadeUP 1s ',
				'fadeUP2': 'fadeUP 2s ',
				'fadeUP3': 'fadeUP 3s ',
				'fadeDOWN': 'fadeDOWN 1s ',
				'fadeLEFT1': 'fadeLEFT 1s ',
				'fadeLEFT2': 'fadeLEFT 2s ',
				'fadeLEFT3': 'fadeLEFT 3s ',
				'fadeRIGHT1': 'fadeRIGHT 1s ',
				'fadeRIGHT2': 'fadeRIGHT 2s ',
				'fadeRIGHT3': 'fadeRIGHT 3s ',
			  },
			keyframes: {
				mPulse: {
					'0%': { transform: "scale(1)" },
					'50%': { transform: 'scale(1)', boxShadow: "0 0 0 6px #ff00003b" },
					'100%': { transform: "scale(1)", boxShadow: "0 0 0 0 #ff000000" },
				},
				mBounce: {
					'0%': { transform: 'translateY(-100%)', opacity:'0' },
					'20%': { transform: 'translateY(-60%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
					'35%': { transform: 'translateY(0%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'},
					'50%': { transform: 'translateY(-40%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
					'70%': { transform: 'translateY(0%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'},
					'90%': { transform: 'translateY(-20%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
					'100%': { transform: 'translateY(0%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'},
				},
				fadeDOWN: {
					'0%': { transform: 'translateY(-2rem)', opacity:'0' },
					'100%': { transform: 'translateY(0rem)', opacity:'1' },
				},
				fadeUP: {
					'0%': { transform: 'translateY(2rem)', opacity:'0' },
					'100%': { transform: 'translateY(0rem)', opacity:'1' },
				},
				fadeUP2: {
					'0%': { transform: 'translateY(2rem)', opacity:'0' },
					'80%': { transform: 'translateY(2rem)', opacity:'0' },
					'100%': { transform: 'translateY(0rem)', opacity:'1' },
				},
				fadeIN: {
					'0%': { transform: 'scaleX(0)', opacity:'0' },
					'100%': { transform: 'scaleX(1)', opacity:'1' },
				},
				fadeOUT: {
					'0%': { transform: 'scaleX(1)', opacity:'1' },
					'100%': { transform: 'scaleX(0)', opacity:'0' },
				},
				fadeLEFT: {
					'0%': { transform: 'translateX(2rem)', opacity:'0' },
					'100%': { transform: 'translateX(0rem)', opacity:'1' },
				},
				fadeRIGHT: {
					'0%': { transform: 'translateX(-2rem)', opacity:'0' },
					'100%': { transform: 'translateX(0rem)', opacity:'1' },
				},
			},
		  },
	},
	plugins: [],
};
