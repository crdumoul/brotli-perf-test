// transcoding-service-output/Youtube
TWP = window.TWP || {};
TWP.PostTV = TWP.PostTV || {};
TWP.PostTV.ytConfig = {
	pingFrequency: {
		enabled: true,
		url: 'https://posttvbeta.washingtonpost.com/posttv-beta/sl-yt-state',
		interval: {
			default: 60, // seconds
			streamingBar: 60 // seconds
		},
		maxPings: 60 // number of pings -- assuming 60 second interval, translates to 1 hour
	}
};
