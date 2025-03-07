// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router); // Inject Router for redirection

//   // Retrieve token from localStorage
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       const extractedRole = decodedToken.userGroup; // Role from token
//       const storedRole = localStorage.getItem('role'); // Role from localStorage

//       // If roles don't match, remove token and redirect to login
//       if (storedRole !== extractedRole) {
//         console.warn('⚠️ Role mismatch detected! Logging out user.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         router.navigate(['/login']); // Redirect to login page
//         return next(req); // Continue the request without modifying it
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token'); // Remove invalid token
//       localStorage.removeItem('role');
//       router.navigate(['/login']);
//       return next(req);
//     }
//   }

//   // If token is valid, attach it to the request headers
//   const clonedReq = req.clone({
//     setHeaders: {
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   });

//   return next(clonedReq);
// };
