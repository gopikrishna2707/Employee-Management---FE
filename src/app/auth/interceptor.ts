import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, res: HttpHandlerFn,) => {
    
  const publicUrls = ['/auth/login', '/auth/signup'];

  // If request URL matches public URL → skip token
  if (publicUrls.some((url) => req.url.includes(url))) {
    return res(req);
  }

  const jwtToken = localStorage.getItem('jwt');

  if (jwtToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return res(authReq);
  }
  return res(req);
};
