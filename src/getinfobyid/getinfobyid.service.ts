import { Injectable } from '@nestjs/common';
import { GetInfoById } from './dto/getinfobyid.dto';
import { exec } from 'child_process';
import {
  GetInfoByIdCommonError,
  GetInfoByIdSuccessResponse,
} from './dto/getinfobyid-response.dto';

@Injectable()
export class GetinfobyidService {
  private ping(dto: GetInfoById): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(`ping -c 10 ${dto.params.host}`, (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
    });
  }

  private parsePing(stdout: string): [boolean, string] {
    const parsedArr = stdout.split('\n');
    const parsedPackedLoss = parseInt(
      parsedArr
        .find((item, _, arr) => item === arr[arr.length - 3])
        .split(',')[2],
    );
    const parsedAvaragePingTime = parsedArr
      .find((item, _, arr) => item === arr[arr.length - 2])
      .split('/')[4];
    return [Boolean(parsedPackedLoss), parsedAvaragePingTime];
  }

  async returnPipe(dto: GetInfoById): Promise<string> {
    try {
      const pingResult = await this.ping(dto);
      if (pingResult.message) {
        const errorResponse: GetInfoByIdCommonError = {
          code: '504',
          message: pingResult.message,
          data: {},
        };
        return JSON.stringify(errorResponse);
      }
      const [parsedPackedLoss, parsedAvaragePingTime] =
        this.parsePing(pingResult);
      if (parsedPackedLoss) {
        const errorResponse: GetInfoByIdCommonError = {
          code: '504',
          message:
            'Not all out of 10 packets handled. Please try to ping this address later',
          data: {},
        };
        return JSON.stringify(errorResponse);
      }
      const successResponse: GetInfoByIdSuccessResponse = {
        result: {
          id: '55',
          size: 11,
          used: 9,
          description: 'any description',
          name: 'any name',
          status: 0,
          ping: Number(parsedAvaragePingTime),
          apps: [
            {
              id: '55',
              bundleId: 'string',
              title: 'any title',
              platform: 1,
            },
          ],
        },
      };
      return JSON.stringify(successResponse);
    } catch (error) {
      const errorResponse: GetInfoByIdCommonError = {
        code: '500',
        message: error.message,
        data: {},
      };
      return JSON.stringify(errorResponse);
    }
  }
}
