
import ReactGA4 from "react-ga4";

const TrackGoogleAnalyticsEvent = (
  category: string,
  action: string,
) => {
  ReactGA4.event({
    category: category,
    action: action,
  });
};


export { TrackGoogleAnalyticsEvent }