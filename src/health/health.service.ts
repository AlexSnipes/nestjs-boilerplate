import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  uptime() {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  getHealth() {
    const data = {
      uptime: this.uptime(),
      message: 'Working',
      status: true,
      date: new Date(),
    };
    return data;
  }
}
