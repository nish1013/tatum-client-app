import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  //HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    //private readonly httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check([
      // TODO: Add taum health check when moving to production with paid plan
      // need verification of the health check endpoint
      // () => this.httpHealthIndicator.pingCheck('tatum', 'https://taum.io/v4/health'),
    ]);
  }
}
