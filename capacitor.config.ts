import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sidegig.app.gallery',
  appName: 'SideGig Gallery App',
  webDir: 'www',
   "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0,
      "launchAutoHide": false
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
