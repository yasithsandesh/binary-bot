import { TrackJS } from 'trackjs';
import { isProduction } from "../utils/tools";


export const default_errors_to_ignore = [
    'CallError',
    'WrongResponse',
    'GetProposalFailure',
    'RateLimit',
    'DisconnectError',
    'MarketIsClosed',
    'Cannot read property `open_time` of undefined', // Exception: SmartCharts error workaround, don't log nor show.
  ];

export function trackJSTrack (error) {
  let message;
  let code;
  if (typeof error === "string") {
      code = "Unknown";
      message = error;
  } else if (error?.error && typeof error.error === 'object') {
      if (error?.error?.error && typeof error.error.error === 'object') {
        ({ message } = error.error.error);
        ({ code } = error.error.error);
      } else {
        ({ message } = error.error);
        ({ code } = error.error);
      }
    } else {
      ({ message } = error);
      ({ code } = error);
    }

  if (isProduction()) {
    if(!default_errors_to_ignore.includes(code) && message !== undefined){
      TrackJS.track(code);
    }
  }
  return {code, message};
}