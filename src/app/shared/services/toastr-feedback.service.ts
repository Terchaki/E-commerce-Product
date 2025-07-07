import { Injectable } from '@angular/core';

// Toastr
import { GlobalConfig, ToastrService } from 'ngx-toastr';

// RXJS
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrFeedbackService {
  toaster: any;
  globalConfig: GlobalConfig;

  constructor(private toastr: ToastrService) {
    this.globalConfig = this.toastr.toastrConfig;
  }

  public toast(
    message: string,
    titulo: string,
    typeToaster: 'success' | 'info' | 'warning' | 'error'
  ) {
    this.toastr.clear();

    timer(500).subscribe(() => {
      const config = {
        progressBar: true,
        extendedTimeOut: 3000,
        positionClass: 'toast-bottom-full-width',
      };

      switch (typeToaster) {
        case 'success':
          this.toastr.success(message, titulo, config);
          break;
        case 'info':
          this.toastr.info(message, titulo, config);
          break;
        case 'warning':
          this.toastr.warning(message, titulo, config);
          break;
        case 'error':
          this.toastr.error(message, titulo, config);
          break;
      }
    });
  }
}
