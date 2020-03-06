import { ThrottleOptions } from "./types/types";

export default (
  func: () => any,
  wait?: number,
  options: ThrottleOptions = {}
) => {
  let context: object, args: object, result: any;
  let timeout: number = 0;
  let previous: number = 0;

  const later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = 0;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function() {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = <number>wait - (now - <number>previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = window.setTimeout(later, remaining);
    }
    return result;
  };
};
