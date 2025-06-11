import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const customReq = req.clone({
    setHeaders: {
      'Authorization': environment.apiKey,
      'Content-Type': 'application/json',
    }
  });

  return next(customReq);
};
