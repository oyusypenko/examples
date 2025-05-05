import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retry, retryWhen } from 'rxjs/operators';

const RETRY_CONFIG = {
  maxRetries: 3,
  scalingDuration: 700,
  excludedStatusCodes: [400, 401, 403, 404]
};

@Injectable()
export class CNBApiServiceClient {
  private readonly logger = new Logger(CNBApiServiceClient.name);

  constructor(private httpService: HttpService) {
    this.setupInterceptors();
  }

  get<T>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return this.httpService.get<T>(url, config)
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            mergeMap((error, i) => {
              const retryAttempt = i + 1;

              if (
                retryAttempt > RETRY_CONFIG.maxRetries ||
                (error.response && RETRY_CONFIG.excludedStatusCodes.includes(error.response.status))
              ) {
                return throwError(() => error);
              }

              this.logger.warn(`Retrying API call (attempt ${retryAttempt}/${RETRY_CONFIG.maxRetries}) after error: ${error.message}`);

              const delay = RETRY_CONFIG.scalingDuration * Math.pow(2, retryAttempt - 1);
              return timer(delay);
            })
          )
        ),
        catchError(error => this.handleError(error))
      );
  }

  private setupInterceptors(): void {
    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          this.logger.error(
            `CNB API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
            error.stack
          );
        } else if (error.request) {
          this.logger.error(
            `CNB API error: No response received - ${error.message}`,
            error.stack
          );
        } else {
          this.logger.error(
            `CNB API error: Request setup failed - ${error.message}`,
            error.stack
          );
        }

        const enhancedError = error as AxiosError & { isApiError: boolean; timestamp: string };
        enhancedError.isApiError = true;
        enhancedError.timestamp = new Date().toISOString();

        return Promise.reject(enhancedError);
      }
    );
  }

  private handleError(error: AxiosError): Observable<never> {
    this.logger.error(`Final API error after all retries: ${error.message}`);
    return throwError(() => error);
  }
}