import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
export declare class MemberLimitGuard extends ThrottlerGuard {
    handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean>;
}
