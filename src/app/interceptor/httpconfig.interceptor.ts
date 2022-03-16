import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(
    private snackbar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token-sion')!;

        if (token) {
            request = request.clone({ headers: request.headers.set('x-access-token', token) });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: any = {};

                switch (error.error) {
                    case 'Unauthorized':
                        localStorage.clear();
                        window.location.replace('/login');
                        break;
                    case null:        //    Apabila backend tidak aktif
                        data = {
                            msg: 'Server sedang sibuk',
                            reason: error && error.statusText ? error.statusText : error.message,
                            status: error.status,
                        };
                        // this.snackbar.open(data['msg'], "", {
                        //     duration: 2000
                        // })
                        console.log(data);

                        break;

                    default:
                        switch (error.error.message) {
                            case undefined:        //    Apabila status error assoactionKey Sequelize
                                if (error.status == 404) { //jika terdapat error API
                                    data = {
                                        reason: error && error.message ? error.message : error.statusText,
                                        status: error.status,
                                        msg: 'Somethink is wrong!',
                                    };
                                }
                                else {
                                    data = {
                                        reason: error && error.message ? error.message : error.statusText,
                                        status: error.status,
                                        msg: 'Koneksi anda tidak aktif',
                                    };
                                }
                                /* this.snackbar.open(data['msg'], "", {
                                    duration: 2000
                                }) */
                                console.log(data);

                                break;
                            default:
                                switch (error.error.message.errors) {

                                    case undefined:

                                        switch (error.error.message.name) {
                                            case undefined:    //Untuk error salah password dll, pesan buat sendiri
                                                data = {
                                                    reason: error && error.error.message ? error.error.message : error.statusText,
                                                    status: error.status,
                                                    msg: 'password is wrong'
                                                };
                                                break;
                                            default:    // Untuk error delete foreign key masih ada
                                                data = {
                                                    msg: 'sesi anda telah berakhir',
                                                    reason: error && error.error.message.name ? error.error.message.name : error.statusText,
                                                    status: error.status
                                                };
                                                this.snackbar.open(data['msg'], "", {
                                                    duration: 2000
                                                })
                                                break;
                                        }
                                        break;
                                    default:    // Untuk error apabila kena validasi pada sequelize
                                        data = {
                                            msg: "sesi anda telah expired, silahkan melakukan login ulang",
                                            reason: error && error.error.message.errors[0].message ? error.error.message.errors[0].message : error.error.message,
                                            status: error.status
                                        };
                                        this.snackbar.open(data['msg'], "", {
                                            duration: 2000
                                        })
                                        break;
                                }
                                break;
                        }
                        break;
                }
                // if(data['reason'] !== undefined){
                // this.errorDialogService.openDialog(data);
                // this.snackbar.open(data['msg'],"X",{
                //     duration:2000
                //   })
                console.log(data)
                return throwError(error);
                // }
            })
        );
    }
}
