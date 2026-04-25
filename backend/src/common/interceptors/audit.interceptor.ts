import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from '../../audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;
    const path = request.url;
    const actorId = user?.id ?? 'anonymous';

    return next.handle().pipe(
      tap(() => {
        this.auditService.logAction(actorId, `${method} ${path}`, 'Request', undefined, {
          body: request.body,
        });
      }),
    );
  }
}
